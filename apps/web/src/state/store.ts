import { Store, configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { nextApi } from "./nextApi";
import productSlice from "./slices/productState";

export const store: Store = configureStore({
  reducer: {
    [nextApi.reducerPath]: nextApi.reducer,
    productState: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([nextApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
