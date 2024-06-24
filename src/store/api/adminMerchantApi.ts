import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const adminMerchantApi = createApi({
  reducerPath: "adminMerchants",
  baseQuery: fetchBaseQuery({ baseUrl: adminBaseUrl + "/merchant" }),
  endpoints: (build) => ({
    getAllMerchants: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllMerchantsQuery } = adminMerchantApi;
