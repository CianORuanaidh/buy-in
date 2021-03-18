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
    
    const [allKittys] = GetAllKittiesForUser();
    const [dashboardView, setDashboardView] = useState(Enums.DashboardViews.NewGame);
        

    useEffect(() => {

        if (allKittys && allKittys.length > 0) {
            setDashboardView(Enums.DashboardViews.AllGames)
        }

    }, [allKittys])


    const handleViewSelect = (e) => {
        if (e.target.value) {
            setDashboardView(e.target.value);       
        }
    }

    return (
        <div className="container">
            <section className="dashboard-views">
                <ul onClick={handleViewSelect}>
                    <li><label className={`btn btn-secondary ${dashboardView == Enums.DashboardViews.AllGames ? 'selected' : ''}`}>
                        <input className='visually-hidden' type="radio" name="view-select" value={Enums.DashboardViews.AllGames}/>My games
                        </label></li>

                    <li><label className={`btn btn-secondary ${dashboardView == Enums.DashboardViews.NewGame ? 'selected' : ''}`} >
                        <input className='visually-hidden' type="radio" name="view-select" value={Enums.DashboardViews.NewGame}/>new game
                        </label></li>                    
                </ul>
            </section>
            <section>
                { dashboardView == Enums.DashboardViews.NewGame && 
                <div>
                    <NewKitty></NewKitty>
                </div>
                }
                { dashboardView == Enums.DashboardViews.AllGames && 
                <div className="kitty-list">
                    { allKittys && allKittys.map((kitty, i) => <KittyPreview kitty={kitty} key={`${kitty.name}_${i}`}></ KittyPreview>)}
                </div>
                }
            </section>
        </div>
    )
}

export default DashboardPage;