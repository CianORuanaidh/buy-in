import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import { GetKittyById, deleteKittyById } from "../services/api/api.services";

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

    const handleDeleteClick = (e) => {
        console.log('handleDeleteClick')
        console.log(kittyId)
        deleteKittyById(kittyId)
            .then(resp => console.log("DELETED: ", resp))
            .catch(error => console.log(error));
    }



    if (kitty && kitty.error) {
        return (
            <section>
                <h1>we could find your kitty :/</h1>
            </section>
        )
    }

    return (
        kitty && !kitty.error && 
            <section style={{padding: '0 30px'}}>
                <h2>{ kitty.name }</h2>

                <h3>Players</h3>
                { kitty.participants.map((player, i) => <p key={`${player.name}_${i}`}>{player.name}</p>)}
                
                <div className="controls">
                    <button className="btn btn-sm" onClick={handleUpdateClick}>update</button>
                    <button className="btn btn-sm">close</button>
                    <button className="btn btn-sm" onClick={handleDeleteClick}>delete</button>
                </div>

                { check && 
                    <KittyForm kitty={kitty} id={kitty._id}></KittyForm>
                }

            </section>        
    )
}

export default KittyPage; 