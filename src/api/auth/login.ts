import axios, { AxiosResponse } from "axios";

export default function login(email: string, password: string): Promise<AxiosResponse<any> | void> {
    return axios.post(`https://api.made-by-air.com/auth/login?email=${email}&password=${password}`)
}