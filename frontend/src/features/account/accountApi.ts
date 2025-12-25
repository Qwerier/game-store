import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/User";
import { LoginSchema } from "../../app/lib/loginSchema";
import { router } from "../../app/routes/Routing";
import { toast } from "react-toastify";
import { RegisterSchema } from "../../app/lib/registerSchema";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginSchema>({
            query: (creds) => {
                return {
                    method: 'POST',
                    url: 'account/login',
                    body: creds
                }
            },
            // refresh stale data on UserInfo
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                    router.navigate('/');
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation<void, RegisterSchema>({
            query: (creds) => {
                return {
                    method: 'POST',
                    url: 'account/register',
                    body: creds
                }
            },
            async onQueryStarted(_, {queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration successful - you can now sign in !');
                    router.navigate('/login');
                } catch (error) {
                    console.log(error);
                    throw error; // throws so it can be caught in frontend
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            // refresh stale data
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']));
                    router.navigate('/');
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation, 
    useUserInfoQuery, useLazyUserInfoQuery,
    useLogoutMutation } = accountApi;