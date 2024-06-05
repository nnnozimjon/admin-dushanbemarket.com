import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminBaseUrl } from "@/utils";
import { usingBearerToken } from "@/hooks";

export const adminUsersApi = createApi({
  reducerPath: "adminUsers",
  baseQuery: fetchBaseQuery({ baseUrl: adminBaseUrl + "/user" }),
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "",
        method: "GET",
        headers: { Authorization: usingBearerToken() },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = adminUsersApi;
