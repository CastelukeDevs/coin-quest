import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import GlobalStyles from "@/constants/GlobalStyles";
import { CCURL } from "@/constants/String";
import { ColorScale, ColorStandard } from "@/constants/Colors";
import Dimens from "@/constants/Dimens";
import { ICoin, ICoinDetail, ICoinMarket } from "@/types/CoinTypes";
import { useWebSocket } from "@/provider/SocketProvider";
import coinServices from "@/services/coinServices";

const CoinImage = ({ uri }: { uri?: string }) => {
  return (
    <View style={[styles.imageContainer, GlobalStyles.shadow]}>
      <Image source={{ uri }} style={styles.imageOverlay} blurRadius={4} />
      <Image source={{ uri }} style={styles.imageContent} />
    </View>
  );
};

type ICoinCardProps = {
  item: ICoinMarket;
  onPress?: (item: ICoinMarket) => void;
};
const CoinCard = (props: ICoinCardProps) => {
  // const url = CCURL + props.item.ImageUrl;
  const lastItemSymbol = useRef(props.item.symbol);
  const { subscribe, unSubscribe } = useWebSocket();

  // const [COIN, setCOIN] = useState<ICoinDetail | undefined>();

  const price = useMemo(() => {
    return {
      currency: Math.abs(props.item.current_price ?? 0)?.toFixed(2),
      percent: Math.abs(props.item.price_change_percentage_24h ?? 0)?.toFixed(
        2
      ),
      isMin: props.item.price_change_24h < 0,
    };
  }, [props.item]);

  const onItemPressHandler = () => {
    props.onPress?.(props.item);
  };

  useEffect(() => {
    // console.log("[O] loaded", props.item.FullName);
    // return () => {
    //   console.log("[X] unload", props.item.FullName);
    // };
    // subscribe(props.item.symbol);
    // if (lastItemSymbol.current !== props.item.symbol) {
    //   console.log(
    //     `item ${lastItemSymbol.current} rerendered into ${props.item.symbol}`
    //   );
    //   unSubscribe(lastItemSymbol.current);
    //   lastItemSymbol.current = props.item.symbol;
    // }
    // coinServices.getCoinDetail(props.item.id).then(setCOIN);
  }, [props.item]);

  return (
    <TouchableOpacity
      style={styles.componentBaseContainer}
      onPress={onItemPressHandler}
    >
      <CoinImage uri={props.item.image} />

      <View style={{ justifyContent: "center", gap: 4, flex: 1 }}>
        <Text style={GlobalStyles.text_title} numberOfLines={1}>
          {props.item.name}
        </Text>
        <Text style={GlobalStyles.text_title_sub}>{props.item.symbol}</Text>
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
    marginVertical: 4,
    marginHorizontal: 8,
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
