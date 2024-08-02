import { toast } from "@backpackapp-io/react-native-toast";
import createSliceWithThunks from "../utilities/createSliceWithThunks";

export type IDefaultState = {
  default?: null;
  isSignedIn: boolean;
};

export const defaultInitialState: IDefaultState = {
  isSignedIn: false,
};

const defaultReducer = createSliceWithThunks({
  name: "default",
  initialState: defaultInitialState,
  selectors: {
    selectSignInStatus: (state) => state.isSignedIn,
  },
  reducers: (create) => ({
    signInUser: create.reducer((state, action) => {
      state.isSignedIn = true;
      toast.success("Signed In Successfully.");
    }),

    signOutUser: create.reducer((state, action) => {
      state.isSignedIn = false;
      toast.success("Signed Out Successfully");
    }),
  }),
});

export const { selectSignInStatus } = defaultReducer.selectors;
export const { signInUser, signOutUser } = defaultReducer.actions;
export default defaultReducer.reducer;
