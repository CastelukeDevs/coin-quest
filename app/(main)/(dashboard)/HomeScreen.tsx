import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ColorScale, ColorStandard } from "@/constants/Colors";
import Branding from "@/components/commons/Branding";
import Dimens from "@/constants/Dimens";
import Buttons from "@/components/commons/Buttons";
import GlobalStyles from "@/constants/GlobalStyles";
import { ICoinMarket } from "@/types/CoinTypes";
import { Ionicons } from "@expo/vector-icons";
import CoinSwipeableCard from "@/components/CoinSwipeableCard";
import { useSelector } from "react-redux";
import {
  addCoinToWatchList,
  removeCoinFromWatchList,
  selectCoinWatchList,
} from "@/redux/reducers/coinReducer";
import { useAppDispatch } from "@/redux/store";
import coinServices from "@/services/coinServices";
import {
  selectSignInStatus,
  signInUser,
} from "@/redux/reducers/defaultReducer";
import Coins from "@/components/Illustration/Coins";
import Strategy from "@/components/Illustration/Strategy";

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

  useEffect(() => {
    if (watchlist.length >= 1) {
      coinServices
        .getCoinsMarket(1, watchlist.join(","))
        .then((res) => setWatchlistedCoin(res.coins));
    }

    return () => {};
  }, [watchlist]);

  useEffect(() => {
    coinServices.getTrendingCoins().then(setTrendingCoinsID);
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
          flexDirection: "row",
          // overflow: "hidden",
        }}
      >
        <Branding />
        <View style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}>
          <Coins
            style={{
              height: 180,
              aspectRatio: 1,
              position: "absolute",
              zIndex: 10,
              right: 20,
              bottom: -40,
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: Dimens.large,
        }}
      >
        {signedIn && watchlistedCoin.length >= 1 && (
          <View>
            <Text style={styles.sectionHeaderText}>Your Watchlist</Text>
            <View style={{ gap: Dimens.small, marginHorizontal: Dimens.large }}>
              {watchlistedCoin.length >= 1 &&
                watchlistedCoin.map((item) => {
                  return (
                    <CoinSwipeableCard
                      key={item.id}
                      item={item}
                      onRemoveWatchList={removeWatchlistHandler}
                    />
                  );
                })}
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
                <Text
                  style={[
                    { ...GlobalStyles.text_title_sub, textAlign: "center" },
                  ]}
                >
                  Loading trending coins ...
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Strategy
        style={{
          position: "absolute",
          zIndex: -1,
          bottom: 30,
          left: 30,
          height: 300,
        }}
        color={ColorScale.gray[400]}
      />
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
