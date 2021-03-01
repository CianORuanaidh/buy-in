import './UserLogin.scss';
import '../Signup/Signup.scss'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { userLogin } from '../../../services/api.services';

/*
* Login component
*/
function UserLogin() {
    const history = useHistory();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [userEmail, setUserEmail] = useState({value: "", isValid: false });
    const [userPassword, setUserPassword] = useState({value: "", isValid: false });
    
    const onSubmitLogin = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if(!userEmail.isValid || !userPassword.isValid) {

            return;
        }

        const loginDto = { userEmail: userEmail, userPassword: userPassword };

        userLogin(loginDto)
            .then(resp => {
                history.push("/dashboard");
            })
            .catch(err => {
                console.log('ERROR')
                console.log(err)
            })
    }
        
    const handleEmailChange = (e) => {
        const updatedEmail = { 
            ...userEmail, 
            value: e.target.value,
            isValid: !!e.target.value
        }

        setUserEmail(updatedEmail);       
    }

    const handlePasswordChange = (e) => {
        const updatedPassword = { 
            ...userPassword, 
            value: e.target.value,
            isValid: !!e.target.value
        }
   
        setUserPassword(updatedPassword);       
    }

    return (
        <div className="user-login">
            <form onSubmit={onSubmitLogin} submitted={`${formSubmitted}`}>
                <div className="text-input">
                    <label htmlFor="userEmail">user email</label>
                    <input className="form-input" type="email" name="userEmail" id="userEmail" value={userEmail.value} onChange={handleEmailChange} isvalid={`${userEmail.isValid}`}/>
                </div>
                <div className="text-input">
                    <label htmlFor="userPassword">password</label>
                    <input className="form-input" type="password" name="userPassword" id="userPassword" value={userPassword.value} isvalid={`${userPassword.isValid}`} onChange={handlePasswordChange}/>
                </div>
                <div className="text-input">
                    <button className="btn btn-login" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default UserLogin;