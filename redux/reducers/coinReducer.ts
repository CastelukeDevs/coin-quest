import { ICoin } from "@/types/CoinTypes";
import createSliceWithThunks from "../utilities/createSliceWithThunks";
import coinServices from "@/services/coinServices";
import { PayloadAction } from "@reduxjs/toolkit";

export type ICoinState = {
  default?: null;
  coinList: ICoin[];
  coinWatchList: string[];
};

export const coinInitialState: ICoinState = {
  coinList: [],
  coinWatchList: [],
};

const coinReducer = createSliceWithThunks({
  name: "coin",
  initialState: coinInitialState,
  selectors: {
    selectCoinList: (state) => state.coinList,
    selectCoinListIsEmpty: (state) => state.coinList.length < 1,
    selectCoinWatchList: (state) => state.coinWatchList,
  },
  reducers: (create) => ({
    resetCoinList: create.reducer(() => coinInitialState),
    getAllCoin: create.asyncThunk(
      () => {
        return coinServices.getCoinList();
      },
      {
        fulfilled: (state, action) => {
          state.coinList = action.payload;
        },
      }
    ),
    addCoinToWatchList: create.reducer(
      (state, action: PayloadAction<{ coinId: string }>) => {
        state.coinWatchList = state.coinWatchList
          ? [...state.coinWatchList, action.payload.coinId]
          : [action.payload.coinId];
      }
    ),
    removeCoinFromWatchList: create.reducer(
      (state, action: PayloadAction<{ coinId: string }>) => {
        state.coinWatchList = [...state.coinWatchList].filter(
          (str) => str !== action.payload.coinId
        );
      }
    ),
  }),
});

export const { selectCoinList, selectCoinListIsEmpty, selectCoinWatchList } =
  coinReducer.selectors;
export const {
  getAllCoin,
  resetCoinList,
  addCoinToWatchList,
  removeCoinFromWatchList,
} = coinReducer.actions;
export default coinReducer.reducer;
