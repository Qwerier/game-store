import { startLoading, stopLoading } from '../layout/uiSlice';
// import { useAppDispatch } from './../store/store';
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";


const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5200/api'
});

// mimic a network delay
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    await sleep();
    api.dispatch(stopLoading());
    const result = await customBaseQuery(args, api, extraOptions);

    if (result.error) {
        const {status, data} = result.error;
        console.log({status, data});
    }
    

    return result;
}
