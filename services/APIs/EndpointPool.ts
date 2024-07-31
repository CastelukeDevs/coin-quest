import { IEndpointPool } from "./APIUtils";

const cgUrl = "https://api.coingecko.com/api/v3";
const marketUrl = cgUrl + "/coins/market";
const coinList = cgUrl + "/coins/markets";
const coinById = cgUrl + "/coins/:coinId";
const searchUrl = cgUrl + "/search";

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
      "x-cg-demo-api-key": process.env.EXPO_PUBLIC_COIN_GECKO_API_KEY,
    },
  },
  {
    endpoint: "GET_COIN_LIST",
    url: coinList,
    method: "get",
    header: {
      "x-cg-demo-api-key": process.env.EXPO_PUBLIC_COIN_GECKO_API_KEY,
    },
  },
  {
    endpoint: "GET_COIN_DETAIL",
    url: coinById,
    method: "get",
    header: {
      "x-cg-demo-api-key": process.env.EXPO_PUBLIC_COIN_GECKO_API_KEY,
    },
  },
  {
    endpoint: "SEARCH_BY_STRING",
    url: searchUrl,
    method: "get",
    header: {
      "x-cg-demo-api-key": process.env.EXPO_PUBLIC_COIN_GECKO_API_KEY,
    },
  },
] as const satisfies IEndpointPool[];

export default EndpointPool;
