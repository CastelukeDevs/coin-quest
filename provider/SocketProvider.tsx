import { CAIURL } from "@/constants/String";
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

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const sendHello = useCallback(() => {
    const message = {
      type: "hello",
      heartbeat: false,
      subscribe_data_type: ["trade"],
    };
    socket?.send(JSON.stringify(message));
  }, [socket]);
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
    ws.onmessage = (event) => {};
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
