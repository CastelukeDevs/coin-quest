import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import { CandlestickChart, TCandle } from "react-native-wagmi-charts";
import { ColorScale } from "@/constants/Colors";
import { currencyFormatterWorklet } from "@/utilities/currencyFormatter";

const ChartText = () => {
  const chartFormat = ({ value }: { value: string }) => {
    "worklet";
    const formattedPrice = currencyFormatterWorklet(value);
    return `${formattedPrice} USD`;
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.labelText}>Open</Text>
          <View style={{}}>
            <CandlestickChart.PriceText type="open" format={chartFormat} />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.labelText}>High</Text>
          <View style={{}}>
            <CandlestickChart.PriceText type="high" format={chartFormat} />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.labelText}>Low</Text>
          <View style={{}}>
            <CandlestickChart.PriceText type="low" format={chartFormat} />
          </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={styles.labelText}>Close</Text>
          <View style={{}}>
            <CandlestickChart.PriceText type="close" format={chartFormat} />
          </View>
        </View>
      </View>
    </>
  );
};

const CandleSticks = ({ data }: { data: TCandle[] }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ borderWidth: 0, padding: 28 }}>
      <CandlestickChart.Provider data={data}>
        <CandlestickChart width={width - 28 * 2} height={width}>
          <CandlestickChart.Candles
            positiveColor={ColorScale.green[400]}
            negativeColor={ColorScale.red[400]}
          />
          <CandlestickChart.Crosshair color={ColorScale.brand[900]}>
            <CandlestickChart.Tooltip />
          </CandlestickChart.Crosshair>
        </CandlestickChart>
        <ChartText />
        <CandlestickChart.DatetimeText />
      </CandlestickChart.Provider>
    </View>
  );
};

export default CandleSticks;

const styles = StyleSheet.create({
  labelText: {
    marginRight: 12,
  },
});
