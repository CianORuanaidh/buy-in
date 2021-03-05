import './DashboardPage.scss';
import { useState, useEffect, useCallback } from 'react';
import { GetAllKittiesForUser } from '../services/api/api.services';
import NewKitty from '../components/NewKitty/NewKitty';
import KittyPreview from '../components/KittyPreview/KittyPreview';
import Enums from '../services/enums/enum.types';

/*
* Dashboard Page
*/
function DashboardPage() {
    console.log('DASHBOARD PAGE')
    
    // console.log(Enums)
    const [allKittys] = GetAllKittiesForUser();
    const [dashboardView, setDashboardView] = useState(Enums.DashboardViews.NewGame);

    
    // console.log('allKittys') 
    // console.log(allKittys)

    // useEffect(() => {
    //     console.log('INIT Dashboard');
    //     return () => {
    //         // console.log('will run when the component unmounts');
    //     }
    // }, []);

    const handleViewSelect = (e) => {

        // console.log('handleViewSelect')
        // console.log(e.target.value)
        setDashboardView(e.target.value)
       
    }

    return (
        <div className="container">
            <section className="dashboard-views">
                <ul onClick={handleViewSelect}>

                    <li><label className={`btn btn-secondary ${dashboardView == Enums.DashboardViews.NewGame ? 'selected' : ''}`} >
                        <input className='visually-hidden' type="radio" name="view-select" value={Enums.DashboardViews.NewGame}/>new game
                        </label></li>
                    
                    <li><label className={`btn btn-secondary ${dashboardView == Enums.DashboardViews.ActiveGames ? 'selected' : ''}`} >
                        <input className='visually-hidden' type="radio" name="view-select" value={Enums.DashboardViews.ActiveGames}/>current games
                        </label></li>


                    <li><label className={`btn btn-secondary ${dashboardView == Enums.DashboardViews.ClosedGames ? 'selected' : ''}`}>
                        <input className='visually-hidden' type="radio" name="view-select" value={Enums.DashboardViews.ClosedGames}/>closed games</label></li>
                    
                    
                    <li><label className={`btn btn-secondary ${dashboardView == Enums.DashboardViews.AllGames ? 'selected' : ''}`}>
                        <input className='visually-hidden' type="radio" name="view-select" value={Enums.DashboardViews.AllGames}/>all games</label></li>
                </ul>
            </section>
            <section>
                { dashboardView == Enums.DashboardViews.NewGame && 
                <div>
                    <NewKitty></NewKitty>
                </div>
                }
                { dashboardView == Enums.DashboardViews.ActiveGames && 
                <div>
                    <p style={{textAlign: 'center'}}>open games</p>
                </div>
                }
                { dashboardView == Enums.DashboardViews.ClosedGames && 
                <div>
                    <p style={{textAlign: 'center'}}>closed games</p>
                </div>
                }
                { dashboardView == Enums.DashboardViews.AllGames && 
                <div>
                    { allKittys && 
                    allKittys.map((kitty, i) => <KittyPreview kitty={kitty} key={`${kitty.name}_${i}`}></ KittyPreview>)}
                </div>
                }
            </section>
            {/* <NewKitty></NewKitty> */}
        </div>
    )
}

export default DashboardPage;