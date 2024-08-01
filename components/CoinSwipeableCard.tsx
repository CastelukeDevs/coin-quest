import { ColorScale, ColorStandard } from "@/constants/Colors";
import GlobalStyles from "@/constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import CoinCard, { ICoinCardProps } from "./CoinCard";
import { useMemo, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectCoinWatchList } from "@/redux/reducers/coinReducer";

type ISwipeButtonProps = {
  isDelete?: boolean;
  onPress?: () => void;
};
const SwipeButton = ({ isDelete, onPress }: ISwipeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 8,
          width: 150,
          backgroundColor: isDelete
            ? ColorScale.red[200]
            : ColorScale.brand[200],
        },
      ]}
    >
      <Ionicons
        name={isDelete ? "trash-bin-outline" : "star-outline"}
        size={20}
      />
      <Text style={GlobalStyles.text_title} numberOfLines={2}>
        {isDelete ? "Remove from Watchlist" : "Add to Watchlist"}
      </Text>
    </TouchableOpacity>
  );
};

type ICoinSwipeAbleCardProps = {
  onAddWatchList?: (v: string) => void;
  onRemoveWatchList?: (v: string) => void;
  //   mode?: "add" | "remove" | "none";
} & ICoinCardProps;
const CoinSwipeableCard = ({
  onAddWatchList,
  onRemoveWatchList,
  //   mode = "none",
  ...props
}: ICoinSwipeAbleCardProps) => {
  const watchlist = useSelector(selectCoinWatchList);
  const ref = useRef<Swipeable>(null);

  const coinId = typeof props.item === "string" ? props.item : props.item.id;

  const onAddPressHandler = () => {
    onAddWatchList?.(coinId);
    ref.current?.close();
  };
  const onRemovePressHandler = () => {
    onRemoveWatchList?.(coinId);
    ref.current?.close();
  };

  const currentMode = useMemo(
    () => (watchlist.includes(coinId) ? "remove" : "add"),
    [props, watchlist]
  );

  return (
    <Swipeable
      ref={ref}
      containerStyle={[
        currentMode === "remove" && { backgroundColor: ColorScale.red[200] },
        currentMode === "add" && { backgroundColor: ColorScale.brand[200] },
        // currentMode === "none" && { backgroundColor: ColorStandard.white },
      ]}
      renderRightActions={() =>
        currentMode === "add" ? (
          <SwipeButton onPress={onAddPressHandler} />
        ) : (
          <SwipeButton onPress={onRemovePressHandler} isDelete />
        )
      }
    >
      <CoinCard {...props} disableOpacity />
    </Swipeable>
  );
};

export default CoinSwipeableCard;
