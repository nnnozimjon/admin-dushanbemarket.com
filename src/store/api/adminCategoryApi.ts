import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const adminCategoryApi = createApi({
  reducerPath: "adminCategory",
  baseQuery: fetchBaseQuery({ baseUrl: adminBaseUrl + "/category" }),
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery } = adminCategoryApi;
