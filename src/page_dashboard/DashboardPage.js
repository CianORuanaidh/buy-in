import './DashboardPage.scss';
import { useState, useEffect, useCallback } from 'react';
import { GetAllKittiesForUser } from '../services/api.services';
import NewKitty from '../components/NewKitty/NewKitty';
import KittyPreview from '../components/KittyPreview/KittyPreview'

/*
* Dashboard Page
*/
function DashboardPage() {
    console.log('DASHBOARD PAGE')
    
    const [allKittys] = GetAllKittiesForUser();
    
    console.log('allKittys') 
    console.log(allKittys)

    useEffect(() => {
        console.log('INIT Dashboard');
        return () => {
            // console.log('will run when the component unmounts');
        }
    }, []);

    return (
        <div>
            <section className="dashboard-views">
                <ul>
                    <li><button className='btn btn-secondary'>new game</button></li>
                    <li><button className='btn btn-secondary'>current games</button></li>
                    <li><button className='btn btn-secondary'>closed games</button></li>
                    <li><button className='btn btn-secondary'>all games</button></li>
                </ul>
            </section>
            <section>
                {/* <p style={{textAlign: 'center'}}>active games</p> */}
                { allKittys && 
                allKittys.map((kitty, i) => <KittyPreview kitty={kitty} key={`${kitty.name}_${i}`}></ KittyPreview>)}
            </section>
            <section>
                <p style={{textAlign: 'center'}}>closed games</p>
            </section>
            <NewKitty></NewKitty>
        </div>
    )
}

export default DashboardPage;