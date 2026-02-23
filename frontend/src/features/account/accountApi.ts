import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Address, User } from "../../app/models/User";
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
        }),
        fetchAddress: builder.query<Address, void>({
            query: () => ({
                url: 'account/address'
            })
        }),
        // create or update therefore needs a possible address as argument
        updateAddress: builder.mutation<Address, Address>({
            query: (address) => ({
                url: 'account/address',
                method: 'POST',
                body: address
            }),
            onQueryStarted: async (address, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                  accountApi.util.updateQueryData('fetchAddress', undefined, (draft) => {
                    Object.assign(draft, {...address}) // assign the object values of address to current address optimistically
                  }) 
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                    console.log(error);
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation, 
    useUserInfoQuery, useLazyUserInfoQuery,
    useLogoutMutation, useFetchAddressQuery, useUpdateAddressMutation } = accountApi;