import { createSlice } from "@reduxjs/toolkit";

export interface RootSliceInterface {
  user?: {
    sessionId: string;
    studentId: string;
    fullName: string;
  };
}

const initialState: RootSliceInterface = {
  user: undefined,
};

const RootSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setUser: (currentState, action) => {
      currentState.user = action.payload;
    },
  },
});

export const { setUser } = RootSlice.actions;

export default RootSlice.reducer;
