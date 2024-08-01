import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import APICall from "@/services/APIs/APICall";
import CoinCard from "@/components/CoinCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import {
  addCoinToWatchList,
  removeCoinFromWatchList,
  selectCoinList,
  selectCoinWatchList,
} from "@/redux/reducers/coinReducer";
import { ICoin, ICoinDetail, ICoinMarket } from "@/types/CoinTypes";
import coinServices from "@/services/coinServices";
import { router } from "expo-router";
import CoinSwipeableCard from "@/components/CoinSwipeableCard";
import { useAppDispatch } from "@/redux/store";
import Dimens from "@/constants/Dimens";

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
      {/* <View style={{ borderWidth: 1 }}>
        <TextInput value={search} onChangeText={setSearch} />
      </View> */}
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
    </View>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
