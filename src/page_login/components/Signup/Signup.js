import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { signupUserCredentials } from '../../../services/api.services';
import './Signup.scss';

/*
* Login component
*/
function Signup() {
    const history = useHistory();

    const defaultPasswordMsgClass = 'password-msg hide';
    const passwordMsgClassShow = 'password-msg show';
    const passwordMsgDefault = 'min length 8 characters, must contain at least one letter and one number.'
    const passwordHint = 'have at least one uppercase and one lowercase to make stronger.';
    const passwordHintTwo = 'add a special character to make even stronger.';

    const [errorMsg, setErrorMsg] = useState('');
    const [passwordClass, setPasswordClass] = useState('password-strength-bar');
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
            console.log('FORM NOT VALID')
            return;
        }
        console.log('FORM IS VALID')

        const userDto = { 
            firstName: firstName.value, 
            lastName: lastName.value, 
            email: email.value, 
            password: password.value 
        };

        signupUserCredentials(userDto)
            .then(resp => {
                console.log('RESP: ', resp)
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
        const updatedPassword = { 
            ...password, 
            value: e.target.value,
            isValid: validatePassword(e.target.value) > 0
        }
        if (!e.target.value){
            setPasswordClass('password-strength-bar');
            setPasswordMsgClass(defaultPasswordMsgClass);
            setPasswordMsg(passwordMsgDefault);
        }    
        setUserPassword(updatedPassword);       
    }

    function validateEmail(email) {
        // General Email Regex (RFC 5322 Official Standard) - https://emailregex.com/ 
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {

        // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const strengthOne = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const strengthTwo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const strengthThree = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        if (strengthThree.test(password)) {
            setPasswordClass(' password-strength-bar strong');
            setPasswordMsgClass(defaultPasswordMsgClass);
            return 3;
        }
        
        // eight characters, at least one uppercase letter, one lowercase letter and one number
        if (strengthTwo.test(password)) {
            setPasswordClass(' password-strength-bar medium');
            setPasswordMsgClass(passwordMsgClassShow);
            setPasswordMsg(passwordHintTwo);
            return 2;
        }
        
        // eight characters, at least one letter and one number
        if (strengthOne.test(password)) {
            setPasswordClass('password-strength-bar weak');
            setPasswordMsgClass(passwordMsgClassShow);
            setPasswordMsg(passwordHint);
            return 1;
        }

        setPasswordMsgClass(passwordMsgClassShow);
        setPasswordClass('password-strength-bar invalid');
        setPasswordMsg(passwordMsgDefault);
        return 0;
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
                    <div className="password-strength-bar" className={passwordClass}></div>
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

export default Signup;