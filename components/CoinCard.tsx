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
import { LineChart } from "react-native-wagmi-charts";
import currencyFormatter from "@/utilities/currencyFormatter";
import { useSelector } from "react-redux";
import { selectSignInStatus } from "@/redux/reducers/defaultReducer";
import { toast } from "@backpackapp-io/react-native-toast";

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
  disableChart?: boolean;
};
const CoinCard = (props: ICoinCardProps) => {
  const isSignedIn = useSelector(selectSignInStatus);

  const [cardItem, setCardItem] = useState<ICoinMarket | undefined>(
    typeof props.item === "string" ? undefined : props.item
  );
  const [market, setMarket] = useState<number[][] | undefined>();

  const marketData = useMemo(
    () => market?.map((data) => ({ timestamp: data[0], value: data[1] })),
    [market]
  );

  const price = useMemo(() => {
    return {
      currency: Math.abs(cardItem?.current_price ?? 0)?.toFixed(2),
      percent: Math.abs(cardItem?.price_change_percentage_24h ?? 0)?.toFixed(2),
      isMin: cardItem?.price_change_24h! < 0,
    };
  }, [cardItem]);

  const onItemPressHandler = () => {
    if (props.onPress) {
      return props.onPress(cardItem!);
    }

    if (!isSignedIn)
      return toast.error("Please Sign in to open details", { id: "401" });

    router.push({
      pathname: "/(main)/DetailsScreen",
      params: { id: cardItem?.id },
    });
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

  useEffect(() => {
    if (cardItem && !props.disableChart) {
      coinServices
        .getCoinChartData(cardItem.id, "market_chart", 1)
        .then((res: any) => {
          // console.log("res", res);
          setMarket(res.prices);
        });
    }
  }, [cardItem, props.disableChart]);

  return (
    <TouchableOpacity
      style={styles.componentBaseContainer}
      onPress={onItemPressHandler}
      disabled={props.disable}
      activeOpacity={props.disableOpacity ? 1 : 0.2}
    >
      <CoinImage uri={cardItem?.image} />

      <View style={{ justifyContent: "center", gap: 4, flex: 1 }}>
        <Text
          style={[GlobalStyles.text_content, { fontFamily: "Bold" }]}
          numberOfLines={2}
        >
          {cardItem?.name}
        </Text>
        <Text style={GlobalStyles.text_content_sub}>{cardItem?.symbol}</Text>
      </View>

      <View
        style={{ justifyContent: "center", gap: 4, alignItems: "flex-end" }}
      >
        <Text style={GlobalStyles.text_title}>
          {currencyFormatter(price.currency)}
          {/* {price.currency} */}
        </Text>
        <Text
          style={[
            GlobalStyles.text_title_sub,
            price.isMin
              ? { color: ColorScale.red[400] }
              : { color: ColorScale.green[400] },
          ]}
        >
          {price.percent}%
        </Text>
      </View>
      {market && (
        <View>
          <LineChart.Provider data={marketData!}>
            <LineChart height={50} width={80}>
              <LineChart.Path
                color={
                  price.isMin ? ColorScale.red[400] : ColorScale.green[400]
                }
              >
                <LineChart.HorizontalLine at={{ index: 0 }} />
                <LineChart.Gradient />
              </LineChart.Path>
            </LineChart>
          </LineChart.Provider>
        </View>
      )}
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
