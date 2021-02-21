// use this file to make api calls
import axios from 'axios';

// set base url
const BASE_URL = `http://localhost:4000/api`;

// set axios defaults
const axiosReq = axios.create({
    withCredentials: true,
    baseURL: BASE_URL 
})

export const createKitty = (kitty) => { 
    const url = `kitty`
    return axiosReq.post(url, kitty);
}