
import { useState, useEffect } from 'react';

function GetKittyData(url) {
    const [kittyData, setKittyData] = useState(null);
    // const [url, setUrl] = useState(url);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const parsed = await response.json(); // .json() returns a promise
            setKittyData(parsed);
            // setUrl(undefined);
        }
        fetchData();
        // if (url) {
        // }
        return () => {
            console.log('will run when the component unmounts');
        }
    }, []);

    return [kittyData];
}

export default GetKittyData;