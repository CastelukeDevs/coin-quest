import { CCWSURL } from "@/constants/String";
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
      CCWSURL + `?api_key=${process.env.EXPO_PUBLIC_CRYPTO_COMPARE_API_KEY}`
    );

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data, data.MESSAGE, data.PARAMETER);
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

  const subscribe = (target: string) => {
    console.log("subscribing ", target, getSubs(target));

    setSubscribed((prev) => [...prev, target]);
    const subRequest = {
      action: "SubAdd",
      subs: [getSubs(target)],
    };

    if (socket && socket.readyState === 1) {
      socket?.send(JSON.stringify(subRequest));
    }
  };

  const unSubscribe = (target: string) => {
    console.log("unsubscribe ", target, getSubs(target));
    setSubscribed((prev) => [...prev.filter((s) => s !== target)]);
    const subRequest = {
      action: "SubRemove",
      subs: [getSubs(target)],
    };
    if (socket && socket.readyState === 1) {
      socket?.send(JSON.stringify(subRequest));
    }
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
