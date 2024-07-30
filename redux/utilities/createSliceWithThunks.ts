import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

/**
 * Redux toolkit tools to build new slice using RTK2.0 syntax
 */
const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export default createSliceWithThunks;
