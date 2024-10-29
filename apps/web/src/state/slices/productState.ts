import { DEFAULT_PAGE_SIZE } from "../nextApi/slices/products";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: string;
  tier: string;
  imageId: number;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    onlineStatus: "idle" | "offline" | "online";
  };
}

export interface FilterStates {
  products: Product[];
  criteriaFilter: {
    category?: string | null;
    keyword?: string | null;
    tier?: string | null;
    theme?: string | null;
    time?: string | null;
    price?: string | null;
    priceRange?: number[] | null;
  };
  metadata: {
    page?: number | null;
    limit?: number;
  };
  loading: boolean;
}

const initialState: FilterStates = {
  products: [],
  criteriaFilter: {
    category: null,
    keyword: "",
    tier: null,
    theme: null,
    time: "Latest",
    price: null,
    priceRange: null,
  },
  metadata: { page: 1, limit: DEFAULT_PAGE_SIZE },
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFieldValue(
      state,
      action: PayloadAction<{
        field:
          | "category"
          | "keyword"
          | "tier"
          | "theme"
          | "time"
          | "price"
          | "priceRange";
        value: any;
      }>
    ) {
      state.criteriaFilter[action.payload.field] = action.payload.value;
    },
    resetFilter(state) {
      state.criteriaFilter = { ...initialState.criteriaFilter };
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setMetadata(
      state,
      action: PayloadAction<{ page?: number | null; limit?: number }>
    ) {
      state.metadata = { ...state.metadata, ...action.payload };
    },
    updatePage(state) {
      state.metadata.page = (state.metadata?.page ?? 1) + 1;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export default productSlice.reducer;
