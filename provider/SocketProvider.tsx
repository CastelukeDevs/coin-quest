import { CAIURL, CCWSURL } from "@/constants/String";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Create a context for the WebSocket connection
type ISocketContext = {
  socket: WebSocket | null;
  subscribe: (target: string) => void;
  unSubscribe: (target: string) => void;
  init: () => void;
};
const WebSocketContext = createContext<ISocketContext>({
  socket: null,
  subscribe: (t) => {},
  unSubscribe: (t) => {},
  init: () => {},
});

const typelist = {
  Trade: { channel: "Trade", type: 0 },
  Ticker: { channel: "Ticker", type: 2 },
  CCCAGG: { channel: "CCCAGG", type: 5 },
};
const exchange = "CCCAGG";

type IChannel = keyof typeof typelist;

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [subscribed, setSubscribed] = useState<string[]>([]);
  const [quote, setQuote] = useState<"USD" | "IDR">("USD");
  const [type, setType] = useState<IChannel>("CCCAGG");

  const getSubs = (str: string) => {
    const string = `${typelist[type].type}~${exchange}~${str}~${quote}`;

    return string;
  };

  const init = useCallback(() => {
    const ws: WebSocket = new WebSocket(
      CAIURL +
        `?apikey=${
          process.env.EXPO_PUBLIC_COIN_API_IO_API_KEY ??
          process.env.COIN_API_IO_API_KEY
        }`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      sendHello();
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Socket Provider message:", data, data.type);
    };
    ws.onerror = (error) => console.log("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    setSocket(ws);
  }, []);

  useEffect(() => {
    if (socket === null) {
      init();
    }

    return () => {
      socket?.close();
      setSocket(null);
    };
  }, []);

  const sendHello = () => {
    const message = {
      type: "hello",
      heartbeat: false,
      subscribe_data_type: ["trade"],
    };
    socket?.send(JSON.stringify(message));
  };

  const subscribe = (target: string) => {
    const message = {
      type: "subscribe",
      heartbeat: false,
      subscribe_data_type: ["book20"],
      subscribe_filter_asset_id: [
        // target,
        // `COINBASE_SPOT_${target.toUpperCase()}_USD`,
        `${target.toUpperCase()}/USD`,
      ],
      // subscribe_filter_asset_id: [target],
    };
    console.log("subscribe", message);

    socket?.send(JSON.stringify(message));
  };

  const unSubscribe = (target: string) => {
    const message = {
      type: "unsubscribe",
      heartbeat: false,
      subscribe_data_type: ["book20"],
      // subscribe_filter_asset_id: [target],
      subscribe_filter_asset_id: [
        // target,
        // `COINBASE_SPOT_${target.toUpperCase()}_USD`,
        `${target.toUpperCase()}/USD`,
      ],
    };
    console.log("unsubscribe", message);
    socket?.send(JSON.stringify(message));
  };

  return (
    <WebSocketContext.Provider
      value={{ socket, subscribe, unSubscribe, init: () => {} }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
