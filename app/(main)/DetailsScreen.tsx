import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ICoinMarket, IMarketData } from "@/types/CoinTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import coinServices from "@/services/coinServices";
import {
  CandlestickChart,
  TCandle,
  TData,
  useCandleData,
} from "react-native-wagmi-charts";
import { ColorScale, ColorStandard } from "@/constants/Colors";
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
import PageSelector, { ISelectorItem } from "@/components/PageSelector";
import CoinKeyInfo from "@/components/CoinKeyInfo";

const detailPageItem = [
  { label: "Order Book", value: "order_book" },
  { label: "Information", value: "information" },
  { label: "Recommendation", value: "recommendation" },
] as const satisfies ISelectorItem[];

type IExtendedPage = (typeof detailPageItem)[number]["value"];

const DetailsScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const [Coin, setCoin] = useState<ICoinMarket | undefined>();
  const [OHLCData, setOHLCData] = useState<number[][]>([]);
  const [duration, setDuration] = useState(1);
  const [extendedPage, setExtendedPage] = useState<IExtendedPage>(
    detailPageItem[0].value
  );

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
            paddingTop: Dimens.xLarge,
            gap: Dimens.large,
            backgroundColor: ColorStandard.white,
          }}
        >
          <PageSelector
            data={detailPageItem}
            value={extendedPage}
            onChangeSelected={setExtendedPage}
          />
          {extendedPage === "order_book" && <OrderBook symbol={Coin?.symbol} />}
          {extendedPage === "information" && <CoinKeyInfo coin={Coin} />}
          {extendedPage === "recommendation" && <CoinRecommendation />}
        </View>
      </ScrollView>
    </>
  );
};

const CoinRecommendation = () => {
  const [recomendationList, setRecomendationList] = useState<ICoinMarket[]>([]);

  useEffect(() => {
    coinServices.getTrendingCoins().then(setRecomendationList);
  }, []);

  return (
    <View style={{ gap: 8, backgroundColor: ColorStandard.white }}>
      {recomendationList.map((item) => {
        return <CoinCard item={item} key={item.id} disableChart />;
      })}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
