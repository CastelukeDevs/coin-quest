import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
  addCoinToWatchList,
  removeCoinFromWatchList,
  selectCoinWatchList,
} from "@/redux/reducers/coinReducer";
import { FlashList } from "@shopify/flash-list";
import { useAppDispatch } from "@/redux/store";
import coinServices from "@/services/coinServices";
import {
  selectSignInStatus,
  signInUser,
} from "@/redux/reducers/defaultReducer";

const { width } = Dimensions.get("window");
const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const watchlist = useSelector(selectCoinWatchList);
  const signedIn = useSelector(selectSignInStatus);
  const dispatch = useAppDispatch();

  const [trendingCoinsID, setTrendingCoinsID] = useState<ICoinMarket[]>([]);
  const [watchlistedCoin, setWatchlistedCoin] = useState<ICoinMarket[]>([]);

  const removeWatchlistHandler = (coinId: string) => {
    dispatch(removeCoinFromWatchList({ coinId }));
  };
  const addWatchlistHandler = (coinId: string) => {
    dispatch(addCoinToWatchList({ coinId }));
  };

  const getTrendingCoins = async () => {
    try {
      const list = await coinServices.getTrendingCoins();
      console.log("current Trending coins", list);

      await coinServices
        .getCoinsMarket(1, list.join(","))
        .then((res) => setTrendingCoinsID(res.coins));
    } catch (error) {
      console.log("error while getting trending coins");
    }
  };

  useEffect(() => {
    if (watchlist.length >= 1) {
      coinServices
        .getCoinsMarket(1, watchlist.join(","))
        .then((res) => setWatchlistedCoin(res.coins));
    }

    return () => {};
  }, [watchlist]);

  useEffect(() => {
    getTrendingCoins();
  }, []);

  return (
    <View
      style={{
        //paddingTop: top + Dimens.large
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: Dimens.large,
          paddingTop: top + Dimens.large,
          paddingBottom: Dimens.medium,
          backgroundColor: ColorStandard.white,
          ...GlobalStyles.shadow,
          shadowColor: "black",
        }}
      >
        <Branding />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          // paddingTop: 120,
          paddingBottom: Dimens.large,
        }}
      >
        {signedIn && (
          <View>
            <Text style={styles.sectionHeaderText}>Your Watchlist</Text>
            <View style={{ gap: Dimens.small, marginHorizontal: Dimens.large }}>
              {watchlistedCoin.length >= 1 ? (
                watchlistedCoin.map((item) => {
                  return (
                    <CoinSwipeableCard
                      key={item.id}
                      item={item}
                      onRemoveWatchList={removeWatchlistHandler}
                    />
                  );
                })
              ) : (
                <View style={{ padding: 60 }}>
                  <Text style={GlobalStyles.text_title_sub}>
                    Watchlist empty
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
        <View>
          <Text style={styles.sectionHeaderText}>Trending Coins</Text>
          <View style={{ gap: Dimens.small, marginHorizontal: Dimens.large }}>
            {trendingCoinsID.length >= 1 ? (
              trendingCoinsID.map((item) => {
                return (
                  <CoinSwipeableCard
                    key={item.id}
                    item={item}
                    onRemoveWatchList={removeWatchlistHandler}
                    onAddWatchList={addWatchlistHandler}
                    disableChart
                  />
                );
              })
            ) : (
              <View style={{ padding: 60 }}>
                <Text style={GlobalStyles.text_title_sub}>
                  No trending coins
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {!signedIn && <SignInPrompt />}
    </View>
  );
};

export default HomeScreen;

const SignInPrompt = () => {
  const dispatch = useAppDispatch();
  const signInHandler = () => {
    dispatch(signInUser());
  };
  return (
    <View
      style={{
        width: width - Dimens.xLarge * 2,
        backgroundColor: ColorStandard.white,
        borderRadius: Dimens.medium,
        borderWidth: 2,
        borderColor: ColorScale.gray[200],
        ...GlobalStyles.shadow,
        padding: Dimens.large,
        position: "absolute",
        bottom: Dimens.medium,
        left: Dimens.xLarge,
      }}
    >
      <Buttons
        label="Sign In with Google"
        iconComponent={(props) => <Ionicons name="logo-google" {...props} />}
        onPress={signInHandler}
      />
      <Text style={[GlobalStyles.text_content_sub, styles.footerText]}>
        Sign in to gain access into details and bookmarks.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerText: {
    paddingHorizontal: 50,
    textAlign: "center",
    marginTop: Dimens.small,
    // color: ColorScale.gray[600],
  },
  sectionHeaderText: {
    ...GlobalStyles.text_section_header,
    margin: Dimens.large,
  },
});
