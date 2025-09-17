import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../layout/uiSlice';
// import { useAppDispatch } from './../store/store';
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { router } from '../routes/Routing';

//standard json response from our error endpoints
type ErrorResponse = {
    data: ErrorData,
    status: number
}

type ErrorData = {
    errors?: ErrorList,
    status: number,
    title: string,
    traceId: string,
    type: string
}

// suitable for an object with dynamic key value pairs (Validation response)
type ErrorList = {
    [key: string]: string[]
}

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5200/api'
});

// mimic a network delay
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));


// delayed execution modelling 
export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading());

    if (result.error) {
        const {status, data: errorData} = result.error as ErrorResponse;
        console.log({status, data: errorData});

        switch (status) {
            case 400:
                if ('errors' in errorData){
                    toast.error("Validation Error")
                    throw Object.values(errorData.errors!).flat().join(', ')
                } 
                else toast.error(errorData.title)
                break;
            case 401:
                toast.error(errorData.title)
                break;
            case 404:
                router.navigate('/notfound-error')
                //toast.error(errorData.title)
                break;
            case 500:
                router.navigate('/server-error', {state: {error: errorData}});
                toast.error(errorData.title)
                break
            default:
                break;
        }
    }
    

    return result;
}
