import { ColorScale } from "@/constants/Colors";
import GlobalStyles from "@/constants/GlobalStyles";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export type ISelectorItem = {
  label: string;
  value: any;
};
type IPageSelector = {
  data: ISelectorItem[];
  value: any;
  onChangeSelected: (v: any) => void;
};
const PageSelector = (props: IPageSelector) => {
  const itemPressHandler = (v: any) => {
    props.onChangeSelected(v);
  };
  return (
    <ScrollView
      style={{ flexDirection: "row" }}
      contentContainerStyle={{ alignItems: "flex-end", gap: 8 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {props.data.map((item, i) => {
        return (
          <TouchableOpacity
            key={item.value}
            onPress={() => itemPressHandler(item.value)}
          >
            <View>
              <Text
                style={[
                  props.value === item.value
                    ? GlobalStyles.text_title
                    : GlobalStyles.text_title_sub,
                  { marginRight: 8 },
                ]}
              >
                {item.label}
              </Text>
              {props.value === item.value && (
                <View
                  style={{
                    height: 10,
                    width: "100%",
                    backgroundColor: ColorScale.brand[300],
                    position: "absolute",
                    bottom: 2,
                    zIndex: -1,
                    borderRadius: 100,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default PageSelector;
