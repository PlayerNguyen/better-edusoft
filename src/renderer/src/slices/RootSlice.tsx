import { createSlice } from "@reduxjs/toolkit";

export interface RootSliceInterface {
  sessionId: string | undefined;
}

const initialState: RootSliceInterface = {
  sessionId: undefined,
};

const RootSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setSessionId: (curState, action) => {
      const sessionId = action.payload;

      console.log(`Signed in with session ID: ${sessionId}`);
      curState.sessionId = sessionId;
    },
  },
});

export const { setSessionId } = RootSlice.actions;

export default RootSlice.reducer;
