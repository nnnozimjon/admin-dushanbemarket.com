import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { merchantBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";
import cookie from "js-cookie";

export const merchantOrderApi = createApi({
  reducerPath: "merchantOrders",
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await fetchBaseQuery({
        baseUrl: merchantBaseUrl + "/orders",
      })(args, api, extraOptions);

      if (result?.error?.status === 401) {
        cookie.remove("access_token");
        window.location.reload();
      }

      return result;
    } catch (error: any) {
      console.log("part 2");
      if (error.status === 401) {
        cookie.remove("access_token");
      }
      throw error;
    }
  },
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: ({ storeId }) => ({
        url: "/store/" + storeId,
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    changeStatusOrder: build.mutation({
      query: ({ storeId, orderId, status }) => ({
        url: `/store/${storeId}/order/${orderId}/${status}`,
        method: "POST",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useChangeStatusOrderMutation } = merchantOrderApi;
