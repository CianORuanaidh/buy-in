import './DashboardPage.scss';
import { useState, useEffect, useCallback } from 'react';
import { GetAllKitties } from '../services/api.services';
import NewKitty from '../components/NewKitty/NewKitty';
import KittyPreview from '../components/KittyPreview/KittyPreview'

/*
* Dashboard Page
*/
function DashboardPage() {

    // console.log('Function runs')
    
    // const [quoteData, setQuoteData] = useState(null);

    // const url ='http://localhost:4000/api/kitty/5fb33db2d15e500a2d96266d'
    // const urlAll = 'http://localhost:4000/api/kitty/';
    // const urlAll = 'kitty'

    const [allKittys] = GetAllKitties();
    
    console.log('allKittys') 
    console.log(allKittys)

    useEffect(() => {
        // console.log('INIT Dashboard');
        // axios.get(url)
        //     .then(resp => {
        //         console.log('AXIOS RESP')
        //         console.log(resp.data)
        //     })
        //     .catch(err => console.log('ERROR: ', err));

        return () => {
            // console.log('will run when the component unmounts');
        }
    }, []);

    // useEffect(() => {
    //     // console.log('allKittys useEffect');
    //     // console.log(allKittys);


    //     return () => {
    //         // console.log('will run when the component unmounts');
    //     }
    // }, [allKittys]);


    return (
        <div>


            <section>
                <p style={{textAlign: 'center'}}>active games</p>
                { allKittys && 
                allKittys.map((kitty, i) => <KittyPreview kitty={kitty} key={`${kitty.name}_${i}`}></ KittyPreview>)}
            </section>

            <section>
                <p style={{textAlign: 'center'}}>closed games</p>
            </section>


            {/* <p>Dashboard Page</p> */}
            <NewKitty></NewKitty>

        </div>
    )
}

export default DashboardPage;