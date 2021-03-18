import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import { GetKittyById, deleteKittyById } from "../services/api/api.services";

import KittyForm from '../components/KittyForm/KittyForm';

import './KittyPage.scss';

const  KittyPage = () => {
    
    let { kittyId } = useParams();
        
    const kitty = GetKittyById(kittyId);
    const [check, setCheck] = useState(false);
    
    console.log('kitty')
    console.log(kitty)
    
    const handleUpdateClick = (e) => {
        setCheck(state => !state);
    }

    const handleDeleteClick = (e) => {
        console.log('handleDeleteClick')
        // console.log(kittyId)
        // deleteKittyById(kittyId)
        //     .then(resp => console.log("DELETED: ", resp))
        //     .catch(error => console.log(error));
    }



    if (kitty && kitty.error) {
        return (
            <section>
                <h1>we could not find your kitty :/</h1>
            </section>
        )
    }

    return (
        kitty && !kitty.error && 
            <section className="kitty-page-container">
                <div className="kitty-block">

                    <h2>{ kitty.name }</h2>
                    <p>Buy in amount: {kitty.buyInAmount}</p>

                    {/* <h3>Players</h3>
                    { kitty.participants.map((player, i) => <p key={`${player.name}_${i}`}>{player.name}</p>)} */}
                    
                    <div className="controls">
                        <button className="btn btn-link" onClick={handleUpdateClick}>update</button>
                        {/* <button className="btn btn-sm">close</button> */}
                        <button className="btn btn-link" onClick={handleDeleteClick}>delete</button>
                    </div>

                    { check && 
                        <KittyForm kitty={kitty} id={kitty._id}></KittyForm>
                    }

                </div>
            </section>        
    )
}

export default KittyPage; 