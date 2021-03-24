import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import { GetKittyById, deleteKittyById, GetModifiableKittyById, kittyInvitePlayers } from "../services/api/api.services";
import InviteLink from '../components/InviteLink/InviteLink';
import KittyForm from '../components/KittyForm/KittyForm';
import ParticipantsForm from '../components/ParticipantsForm/ParticipantsForm';

import './KittyPage.scss';

const  KittyPage = () => {
    
    let { kittyId } = useParams();
        
    const [kitty, setKittyData] = GetModifiableKittyById(kittyId);
    const [check, setCheck] = useState(false);

    const convertInviteIdToUrl = (inviteId) => {
        return `http://localhost:3000/public/kitty/join/${inviteId}`;
    }

    const newParticipant = () => {
        return({ name: '', email: '' });
    }

    if (kitty && !kitty.playerGroup) {
        kitty.playerGroup.players = [newParticipant()];
    }
    
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


    const onHandleAddParticipant = (e) => {
        const playerGroup = {
            ...kitty.playerGroup,
        }

        playerGroup.players.push(newParticipant())


        const updateKitty = { 
            ...kitty,
            playerGroup
        };
        setKittyData(updateKitty);
    }

    const removeParticipant = (i) => {        
        const players = kitty.playerGroup.players.filter((p, index) => index !== i);   
        const updateKitty = { 
            ...kitty,
        };        
        updateKitty.playerGroup.players = players;
        setKittyData(updateKitty);
    }

    const handleParticipantNameChange = ({value, i}) => {
        const editedPlayer = { 
            ...kitty.playerGroup.players[i],
            name: value
        };
        const players = kitty.playerGroup.players.map((p, index) => { return index === i ? editedPlayer : p });        
        const updateKitty = { 
            ...kitty,
            // playerGroup
        };        
        updateKitty.playerGroup.players = players;
        setKittyData(updateKitty);
    }

    const handleParticipantEmailChange = ({value, i}) => {
        const editedPlayer = { 
            ...kitty.playerGroup.players[i],
            email: value
        };
        const players = kitty.playerGroup.players.map((p, index) => { return index === i ? editedPlayer : p });        
        const updateKitty = { 
            ...kitty,
            // playerGroup
        };        
        updateKitty.playerGroup.players = players;
        setKittyData(updateKitty);
    }

    const onInvitePlayers = (event) => {

        const inviteEmails = kitty.playerGroup.players.map(p => p.email);
        console.log('inviteEmails')
        console.log(inviteEmails)

        kittyInvitePlayers(kitty._id, inviteEmails)
            .then(resp => console.log('RESP: ', resp))
            .catch(error => console.log('ERROR: ', error))

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
                    
                    { check && 
                        <KittyForm kitty={kitty} id={kitty._id}></KittyForm>
                    }

                    <div className="controls">
                        <button className="btn btn-link" onClick={handleUpdateClick}>update</button>
                        {/* <button className="btn btn-sm">close</button> */}
                        <button className="btn btn-link" onClick={handleDeleteClick}>delete</button>
                    </div>

                    <InviteLink inviteUrl={convertInviteIdToUrl(kitty.inviteId)}></InviteLink>

                    <ParticipantsForm 
                        participants={kitty.playerGroup.players} 
                        onHandleAddParticipant={(e) => onHandleAddParticipant(e)}
                        onRemoveParticipant={(e) => removeParticipant(e)}
                        onHandleParticipantEmailChange={(e) => handleParticipantEmailChange(e)}
                        onHandleParticipantNameChange={(e) => handleParticipantNameChange(e)}
                        onInvitePlayers={(e) => onInvitePlayers(e)}
                        ></ParticipantsForm>


                </div>
            </section>        
    )
}

export default KittyPage; 