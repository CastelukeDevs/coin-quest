import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ICoinMarket } from "@/types/CoinTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import coinServices from "@/services/coinServices";
import {
  CandlestickChart,
  TCandle,
  TData,
  useCandleData,
} from "react-native-wagmi-charts";
import { ColorScale } from "@/constants/Colors";
import currencyFormatter, {
  currencyFormatterWorklet,
} from "@/utilities/currencyFormatter";
import CandleSticks from "@/components/Chart/CandleSticks";
import Buttons from "@/components/commons/Buttons";
import DurationSelector from "@/components/DurationSelector";
import CoinCard from "@/components/CoinCard";
import { useWebSocket } from "@/provider/SocketProvider";
import ScreenHeader from "@/components/ScreenHeader";

const DetailsScreen = () => {
  const { top } = useSafeAreaInsets();
  const { item } = useLocalSearchParams();
  const CoinData: ICoinMarket = JSON.parse(item as string);

  const { subscribe, unSubscribe, socket } = useWebSocket();

  const [OHLCData, setOHLCData] = useState<number[][]>([]);
  const [duration, setDuration] = useState(1);

  const candleChartData = useMemo(
    () =>
      OHLCData.map(
        (item): TCandle => ({
          timestamp: item[0],
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        })
      ),
    [OHLCData]
  );

  useEffect(() => {
    coinServices
      .getCoinChartData(CoinData.id, "ohlc", duration)
      .then(setOHLCData);

    return () => {};
  }, [duration]);

  useEffect(() => {
    if (socket !== null) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received:", data, data.type);
        // return data;
      };
    }
  }, [socket]);

  useEffect(() => {
    subscribe(CoinData.symbol);

    return () => {
      unSubscribe(CoinData.symbol);
    };
  }, []);

  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <CandleSticks data={candleChartData} />
        <DurationSelector onChangeSelected={setDuration} />
        <CoinCard item={CoinData} />
      </View>
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
