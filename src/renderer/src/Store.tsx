import { configureStore } from "@reduxjs/toolkit";
import RootSlice from "./slices/RootSlice";
import SidebarSlice from "./components/Sidebar/slices/SidebarSlice";

const rootStore = configureStore({
  reducer: {
    app: RootSlice,
    sidebar: SidebarSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;

export default rootStore;
