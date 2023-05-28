import { createSlice } from "@reduxjs/toolkit";

export interface SidebarSliceInterface {
  expand: boolean;
}

const initialState: SidebarSliceInterface = {
  expand: false,
};

const SidebarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {
    setSidebar: (curState, action) => {
      curState.expand = action.payload;
    },
  },
});

export const { setSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;
