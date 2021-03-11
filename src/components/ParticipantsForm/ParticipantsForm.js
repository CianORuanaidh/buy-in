import './ParticipantsForm.scss';
import { useState, useEffect, useCallback } from 'react';
// import { GetAllKittiesForUser } from '../services/api/api.services';
// import NewKitty from '../components/NewKitty/NewKitty';
// import KittyPreview from '../components/KittyPreview/KittyPreview';
// import Enums from '../services/enums/enum.types';

import { validateRequired, validateEmail } from '../../services/form/form.validators';

/*
* ParticipantsForm
*/
function ParticipantsForm({participants, onHandleAddParticipant, onRemoveParticipant}) {
    console.log(participants)

    const [minimumParticipantCount] = useState(1)

    const handleAddParticipant = (e) => {
        onHandleAddParticipant(e);
    }

    const removeParticipant = (e, i) => {
        onRemoveParticipant(i);
    }

    const handleParticipantNameChange = (e) => {
        console.log('handleParticipantNameChange')
        console.log(e)
    }

    const handleParticipantEmailChange = () => {
        console.log('handleParticipantEmailChange')
    }

    const isNameValid = (value) => {
        return `${validateRequired(value)}`;
    }
    const isEmailValid = (value) => {
        return `${validateEmail(value)}`;
    }

    return (
        <div className="block block-2">
            <fieldset className="form-fieldset participants">
                <legend className="form-label">invite players</legend>
                {participants.map((participant, i) => {
                    return (
                    <div className="form-row participant-box" key={i}>
                        <div className="input text-input">
                            <label className="form-label visually-hidden" htmlFor="participent-name">Participant name</label>
                            <input className="form-input" id="participent-name" type="text" value={participant.name} placeholder="name" 
                                onChange={(e) => { handleParticipantNameChange(e, i, participant) }}
                                isvalid={isNameValid(participant.name)}/>
                        </div>
                        <div className="input text-input">
                            <label className="form-label visually-hidden" htmlFor="participent-email">Participant email</label>
                            <input className="form-input" id="participent-email" type="text" value={participant.email} placeholder="email" 
                                onChange={(e) => { handleParticipantEmailChange(e, i, participant)}}
                                isvalid={isEmailValid(participant.email)}/>
                        </div>
                        <div>
                            <button disabled={i < minimumParticipantCount} className="btn" type="button" title="Remove participant" onClick={(e) => { removeParticipant(e, i)}}>x</button>
                        </div>              
                    </div>
                    );
                })}
                <div className="form-row add-participant">
                    <button className="btn add-participantX" type="button" onClick={handleAddParticipant}>Add another participant</button>
                </div>
            </fieldset>
        </div>
    )
}

export default ParticipantsForm;