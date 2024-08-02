import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import {
  addCoinToWatchList,
  removeCoinFromWatchList,
  selectCoinWatchList,
} from "@/redux/reducers/coinReducer";
import { ICoinMarket } from "@/types/CoinTypes";
import coinServices from "@/services/coinServices";
import CoinSwipeableCard from "@/components/CoinSwipeableCard";
import { useAppDispatch } from "@/redux/store";
import Dimens from "@/constants/Dimens";
import Coins from "@/components/Illustration/Coins";
import { ColorScale } from "@/constants/Colors";

const RankingScreen = () => {
  const { top } = useSafeAreaInsets();

  const watchlist = useSelector(selectCoinWatchList);
  const dispatch = useAppDispatch();

  const [coins, setCoins] = useState<ICoinMarket[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchedCoins, setSearchedCoins] = useState<ICoinMarket[]>([]);
  const [searchPage, setSearchPage] = useState(0);

  const getCoinList = (targetPage?: number) => {
    const pageToFetch = targetPage ?? page + 1;
    coinServices.getCoinsMarket(pageToFetch).then((res) => {
      setCoins((prev) =>
        pageToFetch <= 1 ? res.coins : [...prev, ...res.coins]
      );
      setPage(res.page);
    });
  };

  const onEndOfListHandler = () => {
    getCoinList(page + 1);
  };

  const addWatchlistHandler = (coinId: string) => {
    dispatch(addCoinToWatchList({ coinId }));
  };

  const removeWatchlistHandler = (coinId: string) => {
    dispatch(removeCoinFromWatchList({ coinId }));
  };

  useEffect(() => {
    getCoinList(1);
  }, []);

  return (
    <View style={{ paddingTop: top, flex: 1 }}>
      <FlashList
        data={search.length < 1 ? coins : searchedCoins}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ marginHorizontal: Dimens.large, marginBottom: 8 }}>
              <CoinSwipeableCard
                item={item}
                onAddWatchList={addWatchlistHandler}
                onRemoveWatchList={removeWatchlistHandler}
                disableChart
              />
            </View>
          );
        }}
        estimatedItemSize={80}
        onEndReached={onEndOfListHandler}
        onEndReachedThreshold={0.8}
      />
      <Coins
        style={{
          position: "absolute",
          zIndex: -1,
          bottom: 30,
          left: 30,
          height: 300,
        }}
        color={ColorScale.gray[400]}
      />
    </View>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
