import axios from 'axios';

// use this file to make api calls

const URL_BASE = `http://localhost:4000/`;


export const createKitty = (args) => { 
    
    const {kittyName, buyInAmount, participants} = args;

    console.log(kittyName)
    console.log(buyInAmount)
    console.log(participants)

    return null;
}