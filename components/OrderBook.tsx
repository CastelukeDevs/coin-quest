import { Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useWebSocket } from "@/provider/SocketProvider";
import GlobalStyles from "@/constants/GlobalStyles";
import { ColorScale } from "@/constants/Colors";

type IOrderBookItem = { price: number; size: number };
type IOrderBookData = {
  asks: IOrderBookItem[];
  bids: IOrderBookItem[];
};

type IOrderBookProps = {
  symbol?: string;
};
const OrderBook = (props: IOrderBookProps) => {
  const { subscribe, unSubscribe, socket } = useWebSocket();

  const [symbol, setSymbol] = useState("");
  const [bookState, setBookState] = useState<IOrderBookData>({
    asks: [],
    bids: [],
  });

  const arr = useMemo(() => [...Array(20).keys()], []);

  useEffect(() => {
    if (props.symbol === undefined) return;
    subscribe(props.symbol);
    if (socket !== null) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Order Book:", data, data.type, symbol);

        if (data.type !== "book20") return console.log("not a book20");
        if (symbol === data.symbol_id) {
          console.log("set book state");

          setBookState({ asks: data.asks, bids: data.bids });
        } else {
          console.log("set sym state");
          setBookState({ asks: data.asks, bids: data.bids });
          setSymbol(data.symbol_id);
        }
      };
    }
    return () => {
      if (props.symbol === undefined) return;
      unSubscribe(props.symbol);
    };
  }, [socket, symbol, props.symbol]);

  return (
    <View>
      <View style={{ flexDirection: "column", gap: 8 }}>
        <OrderBookItem
          bidSize={"Size"}
          bidPrice={"Bid"}
          askPrice={"Ask"}
          askSize={"Size"}
          isBold
        />
        {bookState.bids[0] ? (
          arr.map((v, i) => {
            return (
              <OrderBookItem
                key={v}
                bidSize={bookState.bids[i]?.size}
                bidPrice={bookState.bids[i]?.price}
                askPrice={bookState.asks[i]?.price}
                askSize={bookState.asks[i]?.size}
              />
            );
          })
        ) : (
          <View style={{ alignItems: "center", padding: 50 }}>
            <Text style={GlobalStyles.text_title_sub}>Order Book Empty</Text>
          </View>
        )}
      </View>
    </View>
  );
};

type IOrderBookItemProps = {
  bidSize: string | number;
  bidPrice: string | number;
  askSize: string | number;
  askPrice: string | number;
  isBold?: boolean;
};
const OrderBookItem = (props: IOrderBookItemProps) => {
  return (
    <>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              GlobalStyles.text_content,
              props.isBold && { fontFamily: "Bold" },
              { color: ColorScale.green[800] },
            ]}
          >
            {props.bidSize}
          </Text>
          <Text
            style={[
              GlobalStyles.text_content,
              props.isBold && { fontFamily: "Bold" },
              { color: ColorScale.green[800] },
            ]}
          >
            {props.bidPrice}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              GlobalStyles.text_content,
              props.isBold && { fontFamily: "Bold" },
              { color: ColorScale.red[800] },
            ]}
          >
            {props.askPrice}
          </Text>
          <Text
            style={[
              GlobalStyles.text_content,
              props.isBold && { fontFamily: "Bold" },
              { color: ColorScale.red[800] },
            ]}
          >
            {props.askSize}
          </Text>
        </View>
      </View>
    </>
  );
};

export default OrderBook;
