export { store } from "./store";

export {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useSendOTPMutation,
  useIsUserAvailableMutation,
} from "./api/authApi";

export {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetByIdQuery,
  useDeleteProductByIdMutation,
} from "./api/merchantProductApi";

export { useGetAllCategoryQuery } from "./api/merchantCategoryApi";

export { useGetAllStoresQuery, useGetStoreInfoQuery, useUpdateStoreInfoMutation, useChangePasswordMutation} from "./api/MerchantStoresApi";

export {
  useGetAllOrdersQuery,
  useChangeStatusOrderMutation,
  useGetOrdersCountQuery
} from "./api/MerchantOrderApi";

export { useGetAllCategoryQuery as useGetAllAdminCategory } from "./api/adminCategoryApi";
export { useGetAllUsersQuery as useGetAllAdminUsersQuery } from "./api/adminUsersApi";
export { useGetAllWidgetsQuery } from "./api/adminWidgetApi";

export {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
} from "./api/adminPaymentsApi";

export { useGetAllMerchantsQuery } from './api/adminMerchantApi';