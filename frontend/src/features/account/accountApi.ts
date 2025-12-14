import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/User";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        login: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    method: 'POST',
                    url: 'login?useCookies=true',
                    body: creds
                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    method: 'POST',
                    url: 'account/register',
                    body: creds
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info'
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            })
        })
    })
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = accountApi;