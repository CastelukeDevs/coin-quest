import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import GlobalStyles from "@/constants/GlobalStyles";
import { CCURL } from "@/constants/String";
import { ColorScale, ColorStandard } from "@/constants/Colors";
import Dimens from "@/constants/Dimens";
import { ICoin, ICoinDetail, ICoinMarket } from "@/types/CoinTypes";
import { useWebSocket } from "@/provider/SocketProvider";
import coinServices from "@/services/coinServices";
import { router } from "expo-router";

const CoinImage = ({ uri }: { uri?: string }) => {
  return (
    <View style={[styles.imageContainer, GlobalStyles.shadow]}>
      <Image source={{ uri }} style={styles.imageOverlay} blurRadius={4} />
      <Image source={{ uri }} style={styles.imageContent} />
    </View>
  );
};

export type ICoinCardProps = {
  item: ICoinMarket | string;
  onPress?: (item: ICoinMarket) => void;
  disable?: boolean;
  disableOpacity?: boolean;
};
const CoinCard = (props: ICoinCardProps) => {
  // const url = CCURL + props.item.ImageUrl;
  // const lastItemSymbol = useRef(props.item.symbol);
  const { subscribe, unSubscribe } = useWebSocket();

  const [cardItem, setCardItem] = useState<ICoinMarket | undefined>(
    typeof props.item === "string" ? undefined : props.item
  );

  const price = useMemo(() => {
    return {
      currency: Math.abs(cardItem?.current_price ?? 0)?.toFixed(2),
      percent: Math.abs(cardItem?.price_change_percentage_24h ?? 0)?.toFixed(2),
      isMin: cardItem?.price_change_24h ?? 0 < 0,
    };
  }, [props.item]);

  const onItemPressHandler = () => {
    if (props.onPress) {
      props.onPress(cardItem!);
    } else {
      router.navigate({
        pathname: "/(main)/DetailsScreen",
        params: { id: cardItem?.id },
      });
    }
  };

  useEffect(() => {
    if (typeof props.item === "string") {
      coinServices
        .getCoinsMarket(1, props.item)
        .then((res) => setCardItem(res.coins[0]));
    } else {
      setCardItem(props.item);
    }
  }, [props]);

  return (
    <TouchableOpacity
      style={styles.componentBaseContainer}
      onPress={onItemPressHandler}
      disabled={props.disable}
      activeOpacity={props.disableOpacity ? 1 : 0.2}
    >
      <CoinImage uri={cardItem?.image} />

      <View style={{ justifyContent: "center", gap: 4, flex: 1 }}>
        <Text style={GlobalStyles.text_title} numberOfLines={1}>
          {cardItem?.name}
        </Text>
        <Text style={GlobalStyles.text_title_sub}>{cardItem?.symbol}</Text>
      </View>

      <View
        style={{ justifyContent: "center", gap: 4, alignItems: "flex-end" }}
      >
        <Text style={GlobalStyles.text_title}>USD {price.currency}</Text>
        <Text
          style={[
            GlobalStyles.text_title_sub,
            price.isMin ? { color: "red" } : { color: "green" },
          ]}
        >
          {price.percent}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CoinCard;

const styles = StyleSheet.create({
  componentBaseContainer: {
    flexDirection: "row",
    padding: 12,
    gap: 8,
    backgroundColor: ColorStandard.white,
    // marginVertical: 4,
    // marginHorizontal: 8,
  },
  imageContainer: {
    height: 54,
    aspectRatio: 1,
    backgroundColor: ColorStandard.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Dimens.small,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: ColorScale.gray[300],
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    aspectRatio: 1,
    top: -50,
    opacity: 0.8,
  },
  imageContent: { height: 50, aspectRatio: 1 },
});
