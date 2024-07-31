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

const DetailsScreen = () => {
  const { top } = useSafeAreaInsets();
  const { item } = useLocalSearchParams();
  const CoinData: ICoinMarket = JSON.parse(item as string);

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

  return (
    <View style={{ paddingTop: top, flex: 1 }}>
      <CoinCard item={CoinData} />
      <CandleSticks data={candleChartData} />
      <DurationSelector onChangeSelected={setDuration} />
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
