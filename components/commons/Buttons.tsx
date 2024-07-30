import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import Dimens from "@/constants/Dimens";
import { ColorScale, ColorStandard } from "@/constants/Colors";
import GlobalStyles from "@/constants/GlobalStyles";

type IButtonMode = "contained" | "faded" | "outlined" | "faded-outlined";
type IButtonProps = {
  label: string;
  value?: any;
  onPress?: (v?: any) => void;
  mode?: IButtonMode;
  styles?: ViewStyle;
  labelStyles?: TextStyle;
};
const Buttons = ({ mode = "contained", ...props }: IButtonProps) => {
  const onPressHandler = () => {
    props.onPress?.(props.value);
  };
  return (
    <TouchableOpacity
      style={[
        styles.ButtonBase,
        getStyleByMode(mode),
        mode === "contained" && GlobalStyles.shadow,
        props.styles,
      ]}
      onPress={onPressHandler}
    >
      <Text style={[styles.LabelStyle, props.labelStyles]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const getStyleByMode = (mode: IButtonMode) => {
  switch (mode) {
    case "contained":
      return styles.ButtonContained;
    case "faded":
      return styles.ButtonFaded;
    case "outlined":
      return styles.ButtonOutlined;
    case "faded-outlined":
      return { ...styles.ButtonOutlined, ...styles.ButtonFaded };
    default:
      return styles.ButtonContained;
  }
};

const styles = StyleSheet.create({
  LabelStyle: {
    fontFamily: "SemiBold",
    fontSize: Dimens.font_title,
    textAlign: "center",
    color: ColorScale.brand[900],
  },
  ButtonBase: {
    paddingVertical: Dimens.large,
    paddingHorizontal: Dimens.medium,
    borderRadius: Dimens.small,
  },
  ButtonContained: {
    backgroundColor: ColorScale.brand[400],
  },
  ButtonOutlined: {
    backgroundColor: ColorStandard.white,
    borderWidth: 2,
    borderColor: ColorScale.brand[400],
  },
  ButtonFaded: {
    backgroundColor: ColorScale.brand[50],
  },
});
