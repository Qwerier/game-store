import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

// data-fetching for the error controller
export const errorApi = createApi({
    reducerPath: 'errorApi',
    baseQuery:  baseQueryWithErrorHandling, /*fetchBaseQuery({baseUrl: 'https://localhost:5200/api'}),*/
    endpoints: (builder) =>({
        get400Error: builder.query<void, void>({
            query: () => ({url: 'errors/bad-request'})
        }),
        
        get401Error: builder.query<void, void>({
            query: () => ({url: 'errors/unauthorized'})
        }),
        get404Error: builder.query<void, void>({
            query: () => ({url: 'errors/not-found'})
        }),
        get500Error: builder.query<void, void>({
            query: () => ({url: 'errors/server-error'})
        }),
        getValidationError: builder.query<void, void>({
            query: () => ({url: 'errors/validation-error'})
        }),
    })
})


export const {
    useLazyGet400ErrorQuery, 
    useLazyGet401ErrorQuery, 
    useLazyGet404ErrorQuery, 
    useLazyGet500ErrorQuery, 
    useLazyGetValidationErrorQuery} = errorApi;