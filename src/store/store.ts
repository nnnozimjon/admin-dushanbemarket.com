import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import {  userReducer } from './slices'
import { authApi,  merchantCategoryApi, merchantProductApi } from './api'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [merchantProductApi.reducerPath]: merchantProductApi.reducer,
        [merchantCategoryApi.reducerPath]: merchantCategoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        merchantProductApi.middleware,
        merchantCategoryApi.middleware
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
