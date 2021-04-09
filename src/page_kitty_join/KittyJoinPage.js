
import { useState, useEffect } from 'react';
import { validateEmail } from '../services/form/form.validators';
import { useParams } from "react-router-dom";
import { GetKittyDataFromInviteId } from '../services/app.hooks';
import { kittyInvitePlayers, kittyInvitePlayerConfirm } from "../services/api/api.services";
import './KittyJoinPage.scss';

/*
* KittyJoinPage Page
*/
const KittyJoinPage = (props) => {

    let { kittyInviteId } = useParams();
    let kitty = GetKittyDataFromInviteId(kittyInviteId);

    let [participantEmail, setParticipantEmail] = useState('');
    let [formSubmited, setSubmitionState] = useState(false);
    let [signedUp, setSignedUpState] = useState(false);

    const handleParticipantEmailChange = (e) => {
        setParticipantEmail(e.target.value);
    }

    const getUserName = (kitty) => {
        if (kitty) {
            return `${kitty.user.firstName} ${kitty.user.lastName}`;
        }
        return '';
    }

    // const isEmailValid = (email) => {
    //     return `${validateEmail(email)}`;
    // }

    const signUpToGame = (e) => {
        e.preventDefault();
        setSubmitionState(true)

        if (!validateEmail(participantEmail)) {
            return;
        }

        console.log('IS VALID')
        console.log(kitty)

        const participantEmails = [participantEmail];

        kittyInvitePlayerConfirm(kitty._id, participantEmails)
            .then(resp => { 
                console.log('RESP: ', resp) 
                setSignedUpState(true)
            })
            .catch(error => console.log('ERROR: ', error))
    }


    return (
        <div className="singup-block">
            { signedUp && 
                <h1>YOURE IN!</h1>
            }
            { !signedUp && 
            <div>
                <h1>Want in?</h1>
                {kitty && 
                <div>                
                    <p><strong>{`${kitty.user.firstName} ${kitty.user.lastName}` }</strong> has invited you to join <strong>{ kitty.name }</strong>.</p>
                    <p>Buy in for { kitty.name } is { kitty.buyInAmount }.</p>
                    <p>You want in? Join with your email below.</p>
                    
                    <form submitted={`${formSubmited}`}>
                        <div className='signup-inputs'>
                            <div className="input text-input">
                                <label className="form-label" htmlFor="participent-email">Email</label>
                                <input className="form-input" id="participent-email" type="text" value={participantEmail} placeholder="email" 
                                    onChange={handleParticipantEmailChange}
                                    isvalid={`${validateEmail(participantEmail)}`}/>
                            </div>
                            <button className='btn btn-signup' type="submit" onClick={signUpToGame}>Im in!</button>
                        </div>
                    </form>
            </div>
            }
            </div>
            }
            
        </div>
    )
}

export default KittyJoinPage;