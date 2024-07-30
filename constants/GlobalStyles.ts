import { StyleSheet } from "react-native";
import { ColorScale } from "./Colors";

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
});
