import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";

interface IStore {
  storeId: number;
  storeName: string;
  storeImage: string;
  city: string;
}

interface UserStoresState {
  stores: IStore[];
  selectedStore: IStore | null;
}

const initialState: UserStoresState = {
  stores: [],
  selectedStore: null,
};

const getInitialState = (): UserStoresState => {
  const storedStores = getCookie("stores");
  if (storedStores) {
    return JSON.parse(storedStores);
  }
  return initialState;
};

const userStores = createSlice({
  name: "userStores",
  initialState: getInitialState(),
  reducers: {
    setStores: (state, action: PayloadAction<IStore[]>) => {
      state.stores = action.payload;
      setCookie("stores", JSON.stringify(state));
    },
    setSelectedStore: (state, action: PayloadAction<IStore>) => {
      state.selectedStore = action.payload;
      setCookie("stores", JSON.stringify(state));
    },
  },
});

export const { setStores, setSelectedStore } = userStores.actions;
export const userStoresReducer = userStores.reducer;
