import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/User";
import { LoginSchema } from "../../app/lib/loginSchema";
import { router } from "../../app/routes/Routing";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder)=>({
        login: builder.mutation<void, LoginSchema>({
            query: (creds) => {
                return {
                    method: 'POST',
                    url: 'login?useCookies=true',
                    body: creds
                }
            },
            // refresh stale data on UserInfo
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                    router.navigate('/');
                } catch (error) {
                    console.log(error);
                    
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
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            // refresh stale data
            async onQueryStarted(_, {dispatch, queryFulfilled}){
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

export const {useLoginMutation, useRegisterMutation, useUserInfoQuery, useLogoutMutation} = accountApi;