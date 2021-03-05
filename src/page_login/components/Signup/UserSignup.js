import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { signupUserCredentials } from '../../../services/api/api.services';
import Enums from '../../../services/enums/enum.types';

import { validatePassword, validateEmail } from '../../../services/form/form.validators';

import './UserSignup.scss';

/*
* Login component
*/
function UserSignup(props) {
    const history = useHistory();

    const defaultPasswordMsgClass = 'password-msg hide';
    const passwordMsgClassShow = 'password-msg show';
    const passwordMsgDefault = 'min length 8 characters, must contain at least one letter and one number.'
    const passwordHint = 'have at least one uppercase and one lowercase to make stronger.';
    const passwordHintTwo = 'add a special character to make even stronger.';

    const [errorMsg, setErrorMsg] = useState('');
    const [passwordBarClass, setPasswordBarClass] = useState('password-strength-bar');
    const [passwordMsgClass, setPasswordMsgClass] = useState(defaultPasswordMsgClass);
    const [passwordMsg, setPasswordMsg] = useState(passwordMsgDefault);

    const [email, setUserEmail] = useState({value: "", isValid: false });
    const [password, setUserPassword] = useState({ value: "", isValid: false });
    const [lastName, setUserLastName] = useState({ value: "", isValid: false });
    const [firstName, setUserFirstName] = useState({ value: "", isValid: false });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const validateName = (name) => {
        return !!name;
    }

    const onSubmitSignup = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setErrorMsg('');

        const isValid = firstName.isValid && lastName.isValid && email.isValid && password.isValid;

        if (!isValid) {
            return;
        }

        const userDto = { 
            firstName: firstName.value, 
            lastName: lastName.value, 
            email: email.value, 
            password: password.value 
        };

        signupUserCredentials(userDto)
            .then(resp => {
                props.onSetAppUser(resp);
                history.push("/dashboard");
            })
            .catch(error => {
                if (error.response) {
                    setErrorMsg(error.response.data.message);
                }
            });
    }
    
    const handleFirstNameChange = (e) => {
        const updatedFirstName = { 
            ...firstName, 
            value: e.target.value,
            isValid: validateName(e.target.value)
        }
        setUserFirstName(updatedFirstName);
    }

    const handleLastNameChange = (e) => {
        const updatedLastName = { 
            ...lastName, 
            value: e.target.value,
            isValid: validateName(e.target.value)
        }
        setUserLastName(updatedLastName);
    }
    
    const handleEmailChange = (e) => {
        const updatedEmail = { 
            ...email, 
            value: e.target.value,
            isValid: validateEmail(e.target.value)
        }
        setUserEmail(updatedEmail);       
    }

    const handlePasswordChange = (e) => {

        const value = e.target.value;
        const passwordValidation = validatePassword(value);
        const isValid = passwordValidation != Enums.PasswordStrength.Invalid;

        switch (passwordValidation) {
            case Enums.PasswordStrength.Strong:
                setPasswordBarClass(' password-strength-bar strong');
                setPasswordMsgClass(defaultPasswordMsgClass);    
                break;
        
            case Enums.PasswordStrength.Medium:
                setPasswordBarClass(' password-strength-bar medium');
                setPasswordMsgClass(passwordMsgClassShow);
                setPasswordMsg(passwordHintTwo);
                break;

            case Enums.PasswordStrength.Weak:
                setPasswordBarClass('password-strength-bar weak');
                setPasswordMsgClass(passwordMsgClassShow);
                setPasswordMsg(passwordHint);
                break;
    
            default:
                setPasswordBarClass('password-strength-bar invalid');
                setPasswordMsgClass(passwordMsgClassShow);
                setPasswordMsg(passwordMsgDefault);
                break;
        }

        const updatedPassword = { 
            ...password, 
            value,
            isValid
        }

        setUserPassword(updatedPassword);       

        if (!value){
            setPasswordBarClass('password-strength-bar');
            setPasswordMsgClass(defaultPasswordMsgClass);
            setPasswordMsg(passwordMsgDefault);
        }    
    }

    return (
        <div className="user-signup">
            <form onSubmit={onSubmitSignup} submitted={`${formSubmitted}`}>
                <div className="user-name-box">
                    <div className="text-input">
                        <label htmlFor="userName">first name</label>
                        <input className="form-input" type="text" name="userFirstName" id="userFirstName" value={firstName.value} isvalid={`${firstName.isValid}`} onChange={handleFirstNameChange} />
                    </div>
                    <div className="text-input">
                        <label htmlFor="userName">last name</label>
                        <input className="form-input" type="text" name="userLastName" id="userLastName" value={lastName.value} isvalid={`${lastName.isValid}`} onChange={handleLastNameChange} />
                    </div>
                </div>
                <div className="text-input">
                    <label htmlFor="userEmail">email</label>
                    <input className="form-input" type="email" name="userEmail" id="userEmail" value={email.value} isvalid={`${email.isValid}`} onChange={handleEmailChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userPassword">password</label>
                    <input className="form-input" type="password" name="userPassword" id="userPassword" value={password.value} isvalid={`${password.isValid}`} onChange={handlePasswordChange}/>
                    <div className={passwordBarClass}></div>
                    <p className={passwordMsgClass}>
                        {passwordMsg}
                    </p>
                </div>
                {errorMsg && 
                    <div className="error-msg">
                        {errorMsg}
                    </div>
                }
                <div className="text-input">
                    <button className="btn btn-signup" type="submit">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default UserSignup;