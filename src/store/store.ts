import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import {  userReducer, userStoresReducer } from './slices'
import { authApi,  merchantCategoryApi, merchantOrderApi, merchantProductApi, merchantStoresApi } from './api'

export const store = configureStore({
    reducer: {
        user: userReducer,
        userStores: userStoresReducer,
        [authApi.reducerPath]: authApi.reducer,
        [merchantProductApi.reducerPath]: merchantProductApi.reducer,
        [merchantCategoryApi.reducerPath]: merchantCategoryApi.reducer,
        [merchantStoresApi.reducerPath]: merchantStoresApi.reducer,
        [merchantOrderApi.reducerPath]: merchantOrderApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        merchantProductApi.middleware,
        merchantCategoryApi.middleware,
        merchantStoresApi.middleware,
        merchantOrderApi.middleware
    )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
