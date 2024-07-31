import { ICoin } from "@/types/CoinTypes";
import createSliceWithThunks from "../utilities/createSliceWithThunks";
import APICall from "@/services/APIs/APICall";
import coinServices from "@/services/coinServices";

export type ICoinState = {
  default?: null;
  coinList: ICoin[];
};

export const coinInitialState: ICoinState = {
  coinList: [],
};

const coinReducer = createSliceWithThunks({
  name: "coin",
  initialState: coinInitialState,
  selectors: {
    selectCoinList: (state) => state.coinList,
    selectCoinListIsEmpty: (state) => state.coinList.length < 1,
  },
  reducers: (create) => ({
    resetCoinList: create.reducer((state) => {
      state.coinList = [];
    }),
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
  }),
});

export const { selectCoinList, selectCoinListIsEmpty } = coinReducer.selectors;
export const { getAllCoin, resetCoinList } = coinReducer.actions;
export default coinReducer.reducer;
