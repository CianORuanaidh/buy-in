import './ParticipantsForm.scss';
import { useState } from 'react';
import { validateRequired, validateEmail } from '../../services/form/form.validators';

/*
* ParticipantsForm
*/
function ParticipantsForm({ 
    participants, 
    onHandleAddParticipant, 
    onRemoveParticipant, 
    onHandleParticipantEmailChange, 
    onHandleParticipantNameChange,
    onInvitePlayers }) {
    
    console.log('ParticipantsForm')
    console.log(participants)

    const [minimumParticipantCount] = useState(1)

    const handleAddParticipant = (e) => {
        onHandleAddParticipant(e);
    }

    const removeParticipant = (i) => {
        onRemoveParticipant(i);
    }

    const handleParticipantNameChange = ({e, i}) => {
        const value = e.target.value;
        onHandleParticipantNameChange({ value, i });
    }

    const handleParticipantEmailChange = ({e, i}) => {
        const value = e.target.value;
        onHandleParticipantEmailChange({ value, i })
    }

    const invitePlayers = (e) => {
        e.preventDefault()
        onInvitePlayers();
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
                <legend className="form-label">invite with email</legend>
                {participants.map((participant, i) => {
                    return (
                    <div className="form-row participant-box" key={i}>
                        {/* <div className="input text-input">
                            <label className="form-label visually-hidden" htmlFor="participent-name">Participant name</label>
                            <input className="form-input" id="participent-name" type="text" value={participant.name} placeholder="name" 
                                onChange={(e) => { handleParticipantNameChange({e, i}) }}
                                isvalid={isNameValid(participant.name)}/>
                        </div> */}
                        <div className="input text-input">
                            <label className="form-label visually-hidden" htmlFor="participent-email">Participant email</label>
                            <input className="form-input" id="participent-email" type="text" value={participant.email} placeholder="email" 
                                onChange={(e) => { handleParticipantEmailChange({e, i}) }}
                                isvalid={isEmailValid(participant.email)}/>
                        </div>
                        <div>
                            <button className="btn" type="button" title="Remove participant" onClick={() => { removeParticipant(i)}}>x</button>
                        </div>              
                    </div>
                    );
                })}
                <div className="form-row add-participant">
                    {/* <button className="btn btn-link" type="button" onClick={handleAddParticipant}>Add {participants.length ? 'another ' : ''} player</button> */}
                    <button className="btn btn-link" type="button" onClick={handleAddParticipant}> + </button>
                </div>
                <div>
                    <button className="btn btn-secondary" type="button"onClick={invitePlayers}>Invite players</button>
                </div>
            </fieldset>
        </div>
    )
}

export default ParticipantsForm;