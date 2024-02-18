import axios, { AxiosResponse } from "axios";

export default function exists(email: string): Promise<AxiosResponse<any, any>> {
    return axios.get(`https://api.made-by-air.com/auth/exists?email=${email}`)
}