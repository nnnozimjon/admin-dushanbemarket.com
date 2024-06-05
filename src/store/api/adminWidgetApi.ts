import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const adminWidgetsApi = createApi({
  reducerPath: "adminWidgets",
  baseQuery: fetchBaseQuery({ baseUrl: adminBaseUrl + "/widget" }),
  endpoints: (build) => ({
    getAllWidgets: build.query({
      query: (location: string) => ({
        url: `?location=${location}`,
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllWidgetsQuery } = adminWidgetsApi;
