import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import { GetKittyById } from "../services/api.services";

import KittyForm from '../components/KittyForm/KittyForm';

import './KittyPage.scss';

const  KittyPage = () => {
    // ^ can also use function declaration here 
    
    let { kittyId } = useParams();
        
    // const urlWithId = 'http://localhost:4000/api/kitty/5fb33db2d15e500a2d96266d';
    // const urlAll = 'http://localhost:4000/api/kitty/';
    // const [allKittys] = GetKittyData(urlAll);
    // console.log('kittyPage') 
    // console.log(allKittys)

    const kitty = GetKittyById(kittyId);
    
    const [check, setCheck] = useState(false);
    // setCheck()
    
    console.log('kitty')
    console.log(kitty)
    
    const handleUpdateClick = (e) => {
        console.log('handleUpdateClick')
        console.log(e)
        // setCheck(check)
        setCheck(state => !state);

    }

    return (
        kitty && 
            <section>
                <h2>{ kitty.name }</h2>

                <h3>Players</h3>
                { kitty.participants.map((player, i) => <p key={`${player.name}_${i}`}>{player.name}</p>)}
                
                <div className="controls">
                    <button className="btn btn-sm" onClick={handleUpdateClick}>update</button>
                    <button className="btn btn-sm">close</button>
                    <button className="btn btn-sm">delete</button>
                </div>

                { check && 
                    <KittyForm kitty={kitty}></KittyForm>
                }

            </section>
        
    )
}

export default KittyPage; 