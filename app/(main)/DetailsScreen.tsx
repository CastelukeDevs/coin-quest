import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
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
import GlobalStyles from "@/constants/GlobalStyles";
import Dimens from "@/constants/Dimens";
import OrderBook from "@/components/OrderBook";

const DetailsScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const [Coin, setCoin] = useState<ICoinMarket | undefined>();
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
    if (Coin === undefined) {
      coinServices.getCoinsMarket(1, id as string).then((res) => {
        setCoin(res.coins[0]);
      });
    } else {
      coinServices
        .getCoinChartData(Coin.id, "ohlc", duration)
        .then(setOHLCData);
    }

    return () => {};
  }, [duration, Coin]);

  return (
    <>
      <ScreenHeader title={Coin?.name} />
      <View style={{ flexDirection: "row", gap: 8, alignItems: "flex-end" }}>
        <Text style={GlobalStyles.text_title}>Market</Text>
        <Text style={GlobalStyles.text_title_sub}>Information</Text>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        {/* <CoinCard item={CoinData} /> */}
        <CandleSticks data={candleChartData} />
        <DurationSelector onChangeSelected={setDuration} />
        <View
          style={{
            paddingHorizontal: Dimens.large,
            marginTop: Dimens.xLarge,
            gap: Dimens.large,
          }}
        >
          <Text style={GlobalStyles.text_section_header}>Order Book</Text>
          <OrderBook symbol={Coin?.symbol} />
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
