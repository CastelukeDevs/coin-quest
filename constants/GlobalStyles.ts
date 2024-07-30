import { StyleSheet } from "react-native";
import { ColorScale } from "./Colors";
import Dimens from "./Dimens";

export default StyleSheet.create({
  shadow: {
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.25,
    shadowColor: ColorScale.brand[400],
  },
  text_content: {
    fontFamily: "Regular",
    fontSize: Dimens.font_content,
  },
  text_content_sub: {
    fontFamily: "Regular",
    fontSize: Dimens.font_content_sub,
    color: ColorScale.gray[400],
  },
  text_section_header: {
    fontFamily: "Bold",
    fontSize: Dimens.font_title_sub,
    color: ColorScale.gray[400],
  },
});
