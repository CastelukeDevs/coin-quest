type ICoinsSearchResult = {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

type IExchangesSearchResult = {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
};

type ICategoriesSearchResult = {
  id: number;
  name: string;
};

type INFTSearchResult = {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
};

type ISearchResult = {
  coins: ICoinsSearchResult[];
  exchanges: IExchangesSearchResult[];
  icos: any[];
  categories: ICategoriesSearchResult[];
  nfts: INFTSearchResult[];
};
