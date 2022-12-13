import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import tokensReducer from "./tokens";
import web3ModalReducer from "./web3Modal";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userReducer,
    tokens: tokensReducer,
    web3Modal: web3ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
