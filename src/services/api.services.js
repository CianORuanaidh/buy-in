// use this file to make api calls
import axios from 'axios';
import { useState, useEffect } from 'react';

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



// Custom Hooks

export function GetKittyData(url) {
    const [kittyData, setKittyData] = useState(null);

    useEffect(() => {


        const fetchData = async () => {

            // const response = await fetch(url);
            // const parsed = await response.json(); // .json() returns a promise
            console.log(url)

            const response = await axiosReq.get(url);
            console.log('RESPONSE')
            console.log(response)
            

            setKittyData(response.data);
        }

        fetchData();

        return () => {
            console.log('will run when the component unmounts');
        }
    }, []);

    return [kittyData];
}