import createSliceWithThunks from "../utilities/createSliceWithThunks";

export type IDefaultState = {
  default?: null;
};

export const defaultInitialState: IDefaultState = {};

const defaultReducer = createSliceWithThunks({
  name: "default",
  initialState: defaultInitialState,
  selectors: {},
  reducers: (create) => ({}),
});

export const {} = defaultReducer.selectors;
export const {} = defaultReducer.actions;
export default defaultReducer.reducer;
