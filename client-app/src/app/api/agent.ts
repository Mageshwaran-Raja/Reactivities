import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "https://localhost:5001";

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
// }, (error: AxiosError) => {
//     // const { status } = error.response!;
//     // switch (status) {
//     //     case 400:
//     //         toast.error('bad request')
//     //         break;
//     //     case 401:
//     //         toast.error('unauthorized')
//     //         break;
//     //     case 403:
//     //         toast.error('forbidden')
//     //         break;
//     //     case 404:
//     //         toast.error('not found')
//     //         break;
//     //     case 500:
//     //         toast.error('server error')
//     //         break;
//     // }
//     return Promise.reject(error);
}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => request.get<Activity[]>('/Activities'),
    details: (id: string) => request.get<Activity>(`/Activities/${id}`),
    create: (activity: Activity) => request.post<void>(`/Activities`, activity),
    update: (activity: Activity) => request.put<void>(`/Activities?id=${activity.id}`, activity),
    delete: (id: string) => request.del<void>(`/Activities/${id}`)
}

const agent = {
    Activities
}

export default agent;