import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { merchantBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const merchantStoresApi = createApi({
  reducerPath: "merchantStores",
  baseQuery: fetchBaseQuery({ baseUrl: merchantBaseUrl + "/stores" }),
  endpoints: (build) => ({
    getAllStores: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllStoresQuery } = merchantStoresApi;
