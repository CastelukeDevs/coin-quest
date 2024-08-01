import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorScale, ColorStandard } from "@/constants/Colors";
import Branding from "@/components/commons/Branding";
import Dimens from "@/constants/Dimens";
import Buttons from "@/components/commons/Buttons";
import GlobalStyles from "@/constants/GlobalStyles";
import CoinCard, { ICoinCardProps } from "@/components/CoinCard";
import { ICoinMarket } from "@/types/CoinTypes";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import CoinSwipeableCard from "@/components/CoinSwipeableCard";
import { useSelector } from "react-redux";
import {
  removeCoinFromWatchList,
  selectCoinWatchList,
} from "@/redux/reducers/coinReducer";
import { FlashList } from "@shopify/flash-list";
import { useAppDispatch } from "@/redux/store";

const mock = {
  ath: 3.09,
  ath_change_percentage: -87.59477,
  ath_date: "2021-09-02T06:00:10.474Z",
  atl: 0.019253,
  atl_change_percentage: 1889.00629,
  atl_date: "2020-03-13T02:22:55.044Z",
  circulating_supply: 35585104432.6065,
  current_price: 0.383082,
  fully_diluted_valuation: 17238695011,
  high_24h: 0.406427,
  id: "cardano",
  image:
    "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
  last_updated: "2024-08-01T05:26:46.029Z",
  low_24h: 0.379296,
  market_cap: 13632016939,
  market_cap_change_24h: -606010614.720003,
  market_cap_change_percentage_24h: -4.25628,
  market_cap_rank: 11,
  max_supply: 45000000000,
  name: "Cardano",
  price_change_24h: -0.01754,
  price_change_percentage_24h: -4.37821,
  roi: null,
  symbol: "ada",
  total_supply: 45000000000,
  total_volume: 329731439,
};

const index = () => {
  const { top } = useSafeAreaInsets();
  const watchlist = useSelector(selectCoinWatchList);
  const dispatch = useAppDispatch();

  const removeWatchlistHandler = (coinId: string) => {
    dispatch(removeCoinFromWatchList({ coinId }));
  };

  return (
    <View style={{ paddingTop: top + Dimens.large, flex: 1 }}>
      <Branding />
      <View style={{ flex: 1, marginTop: Dimens.medium }}>
        <Text style={GlobalStyles.text_section_header}>Your Watchlist</Text>
        <FlashList
          data={watchlist}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 24, marginBottom: 8 }}>
                <CoinSwipeableCard
                  item={item}
                  // onPress={onItemPressHandler}
                  // onAddWatchList={addWatchlistHandler}
                  onRemoveWatchList={removeWatchlistHandler}
                />
              </View>
            );
          }}
          estimatedItemSize={80}
          // onEndReached={onEndOfListHandler}
          // onEndReachedThreshold={1}
        />
      </View>
      <View style={{ height: 100 }}>
        <Buttons label="Sign In" />
        <Text style={[GlobalStyles.text_content_sub, styles.footerText]}>
          Sign in to gain access into details, ranking and bookmarks.
        </Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  footerText: {
    paddingHorizontal: 50,
    textAlign: "center",
    marginTop: Dimens.small,
    // color: ColorScale.gray[600],
  },
});
