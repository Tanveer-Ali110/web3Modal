import axios from "axios";



const instance = axios.create({
    baseURL: "https://localhost.com",
})

const api = (instance: { get: (arg0: string, arg1: any) => any; }) => {
    return {
        get: <T>(url: string, config: any) => {
            return instance.get<T>(url, config);
        }
    }
}