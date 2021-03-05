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

//
// user apis
//
export function signupUserCredentials(userDto) {
    const url = `/users/signup`;
    return axiosReq.post(url, userDto);
}

export function getUserWithToken() {
    const url = `users/getuser`;
    return axiosReq.get(url);
}

export function userLogout() {
    const url = `users/logout`;
    return axiosReq.post(url);
}

export function userLogin(loginDto) {
    const url = `users/login`;
    return axiosReq.post(url, loginDto);
}

//
// kitty apis
//
export const createKitty = (kittyDto) => { 
    const url = `kitty`
    return axiosReq.post(url, kittyDto);
}

export function updateExisitingKitty(kittyDto) {
    const url = `kitty/${kittyDto.id}`;
    return axiosReq.patch(url, kittyDto);
}

export function deleteKittyById(KittyId) {
    const url = `kitty/${KittyId}`;
    return axiosReq.delete(url);
}

//
// Custom Hooks
//

// get all kitties for user
export function GetAllKittiesForUser() {
    const [kittyData, setKittyData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            const response = await axiosReq.get('kitty');

            setKittyData(response.data);
        }

        fetchData();

        return () => {
            console.log('will run when the component unmounts');
        }
    }, []);

    return [kittyData];
}

// get specific kitty by id
export function GetKittyById(kittyId) {
    const [kittyData, setKittyData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {

            const response = await axiosReq.get(`kitty/${kittyId}`);
            
            setKittyData(response.data)
        }

        fetchData().catch(error => setKittyData({ error }));
        
    }, []);

    return kittyData;
}


