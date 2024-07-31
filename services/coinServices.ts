import { ICoin, ICoinDetail, ICoinMarket } from "@/types/CoinTypes";
import APICall from "./APIs/APICall";

type IResponseCoinListData = ICoin[];

const getCoinList = async () => {
  const apiCall = await APICall<IResponseCoinListData>("GET_COIN_LIST");
  return apiCall.response;
};

const getCoinDetail = async (coinId: string) => {
  const apiCall = await APICall<ICoinDetail>("GET_COIN_DETAIL", {
    urlParams: { coinId },
  });
  return apiCall.response;
};

const getCoinsMarket = async (page: number = 1) => {
  const apiCall = await APICall<ICoinMarket[]>("GET_COIN_LIST", {
    params: {
      page,
      per_page: 20,
      vs_currency: "usd",
      order: "market_cap_desc",
    },
  }).then((res) => ({ coins: res.response, page }));

  return apiCall;
};

type IChartMode = "market_chart" | "ohlc";
const getCoinChartData = async (
  coinId: string,
  chartMode: IChartMode = "market_chart",
  days: number = 7
) => {
  const apiCall = await APICall<number[][]>("COIN_MARKET_CHART", {
    urlParams: { coinId, chartMode },
    params: { vs_currency: "usd", precision: 2, days },
  });

  return apiCall.response;
};

export default { getCoinList, getCoinDetail, getCoinsMarket, getCoinChartData };
