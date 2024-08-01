import { ColorStandard } from "@/constants/Colors";
import GlobalStyles from "@/constants/GlobalStyles";
import { ICoinMarket } from "@/types/CoinTypes";
import currencyFormatter from "@/utilities/currencyFormatter";
import { Image, StyleSheet, Text, View } from "react-native";

const CoinKeyInfo = ({ coin }: { coin: ICoinMarket | undefined }) => {
  return (
    <View style={{ paddingBottom: 24 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View
          style={{
            height: 100,
            aspectRatio: 1,
            backgroundColor: ColorStandard.white,
            borderRadius: 100,
            overflow: "hidden",
          }}
        >
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: coin?.image }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Text style={GlobalStyles.text_title}>{coin?.name}</Text>
          <Text style={GlobalStyles.text_title_sub}>{coin?.symbol}</Text>
          <Text style={GlobalStyles.text_section_header}>
            Cap {currencyFormatter(coin?.market_cap ?? 0)}
          </Text>
        </View>
      </View>
      <View style={{ gap: 8, marginTop: 16 }}>
        <Text style={GlobalStyles.text_section_header}>24h data</Text>
        <KeyValueText
          label="Market Cap Rank"
          value={`#${coin?.market_cap_rank ?? 0}`}
        />
        <KeyValueText
          label="Market Cap Change"
          value={currencyFormatter(coin?.market_cap_change_24h ?? 0)}
        />
        <KeyValueText
          label="Price Change"
          value={currencyFormatter(coin?.price_change_24h ?? 0)}
        />
        <KeyValueText
          label="Highest Price"
          value={currencyFormatter(coin?.high_24h ?? 0)}
        />
        <KeyValueText
          label="Lowest Price"
          value={currencyFormatter(coin?.low_24h ?? 0)}
        />
      </View>
    </View>
  );
};

const KeyValueText = ({ label, value }: { label: string; value: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={GlobalStyles.text_content_sub}>{label} </Text>
      <Text style={GlobalStyles.text_content}>{value}</Text>
    </View>
  );
};

export default CoinKeyInfo;
