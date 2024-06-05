import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const adminPaymentsApi = createApi({
  reducerPath: "adminPayments",
  baseQuery: fetchBaseQuery({ baseUrl: adminBaseUrl + "/payments" }),
  endpoints: (build) => ({
    getAllPayments: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
    createPayment: build.mutation({
      query: () => ({
        url: "",
        method: "POST",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllPaymentsQuery, useCreatePaymentMutation } = adminPaymentsApi;
