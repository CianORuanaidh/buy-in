import './DashboardPage.scss';
import { useState, useEffect, useCallback } from 'react';
import GetKittyData from '../components/KittyPage/GetKittyData';
import axios from 'axios';
import NewKitty from '../components/NewKitty/NewKitty';

/*
* Dashboard Page
*/
function DashboardPage() {

    // console.log('Function runs')
    
    // const [quoteData, setQuoteData] = useState(null);

    const url ='http://localhost:4000/api/kitty/5fb33db2d15e500a2d96266d'
    const urlAll = 'http://localhost:4000/api/kitty/';

    const [allKittys] = GetKittyData(urlAll);
    
    // console.log('allKittys') 
    // console.log(allKittys)

    useEffect(() => {
        // console.log('INIT Dashboard');
        axios.get(url)
            .then(resp => {
                console.log('AXIOS RESP')
                console.log(resp.data)
            })
            .catch(err => console.log('ERROR: ', err));

        return () => {
            // console.log('will run when the component unmounts');
        }
    }, []);

    useEffect(() => {
        // console.log('allKittys useEffect');
        // console.log(allKittys);


        return () => {
            // console.log('will run when the component unmounts');
        }
    }, [allKittys]);


    return (
        <div>
            {/* <p>Dashboard Page</p> */}
            <NewKitty></NewKitty>

        </div>
    )
}

export default DashboardPage;