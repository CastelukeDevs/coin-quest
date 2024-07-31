import { ICoin, ICoinDetail, ICoinMarket } from "@/types/CoinTypes";
import APICall from "./APIs/APICall";

type IResponseCoinListData = ICoin[];

const getCoinList = async () => {
  const res = await APICall<IResponseCoinListData>("GET_COIN_LIST");
  return res.response;
};

const getCoinDetail = async (coinId: string) => {
  const res = await APICall<ICoinDetail>("GET_COIN_DETAIL", {
    urlParams: { coinId },
  });
  return res.response;
};

const getCoinsMarket = async (page: number = 1) => {
  return await APICall<ICoinMarket[]>("GET_COIN_LIST", {
    params: {
      page,
      per_page: 20,
      vs_currency: "usd",
      order: "market_cap_desc",
    },
  }).then((res) => ({ coins: res.response, page }));
};

export default { getCoinList, getCoinDetail, getCoinsMarket };
