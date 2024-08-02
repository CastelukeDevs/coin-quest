import { IEndpointPool } from "./APIUtils";

const apikey =
  process.env.COIN_GECKO_API_KEY ?? process.env.EXPO_PUBLIC_COIN_GECKO_API_KEY;

const cgUrl = "https://api.coingecko.com/api/v3";
const marketUrl = cgUrl + "/coins/market";
const coinList = cgUrl + "/coins/markets";
const coinById = cgUrl + "/coins/:coinId";
const coinMarketChartUrl = cgUrl + "/coins/:coinId/:chartMode";
const searchUrl = cgUrl + "/search";
const trendingCoinUrl = cgUrl + "/search/trending";

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */
const EndpointPool = [
  {
    endpoint: "GET_MARKET_DATA",
    url: marketUrl,
    method: "get",
    header: {
      "x-cg-demo-api-key": apikey,
    },
  },
  {
    endpoint: "GET_COIN_LIST",
    url: coinList,
    method: "get",
    header: {
      "x-cg-demo-api-key": apikey,
    },
  },
  {
    endpoint: "GET_COIN_DETAIL",
    url: coinById,
    method: "get",
    header: {
      "x-cg-demo-api-key": apikey,
    },
  },
  {
    endpoint: "SEARCH_BY_STRING",
    url: searchUrl,
    method: "get",
    header: {
      "x-cg-demo-api-key": apikey,
    },
  },
  {
    endpoint: "COIN_MARKET_CHART",
    url: coinMarketChartUrl,
    method: "get",
    header: {
      "x-cg-demo-api-key": apikey,
    },
  },
  {
    endpoint: "TRENDING_COIN",
    url: trendingCoinUrl,
    method: "get",
    header: {
      "x-cg-demo-api-key": apikey,
    },
  },
] as const satisfies IEndpointPool[];

export default EndpointPool;
