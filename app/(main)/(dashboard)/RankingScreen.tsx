import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import APICall from "@/services/APIs/APICall";
import CoinCard from "@/components/CoinCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";
import { selectCoinList } from "@/redux/reducers/coinReducer";
import { ICoin, ICoinDetail, ICoinMarket } from "@/types/CoinTypes";
import coinServices from "@/services/coinServices";
import { router } from "expo-router";

const RankingScreen = () => {
  const { top } = useSafeAreaInsets();

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

  const onItemPressHandler = (item: ICoinMarket) => {
    router.navigate({
      pathname: "/(main)/DetailsScreen",
      params: { item: JSON.stringify(item) },
    });
  };

  useEffect(() => {
    getCoinList(1);
  }, []);

  return (
    <View style={{ paddingTop: top, flex: 1 }}>
      <View style={{ borderWidth: 1 }}>
        <TextInput value={search} onChangeText={setSearch} />
      </View>
      <FlashList
        data={search.length < 1 ? coins : searchedCoins}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => {
          return <CoinCard item={item} onPress={onItemPressHandler} />;
        }}
        estimatedItemSize={80}
        onEndReached={onEndOfListHandler}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
