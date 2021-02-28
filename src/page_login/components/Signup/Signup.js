import './Signup.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

/*
* Login component
*/
function Signup() {
    
    const [passwordClass, setPasswordClass] = useState('password-strength-bar');

    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [lastName, setUserLastName] = useState("");
    const [firstName, setUserFirstName] = useState("");

    const onSubmitSignup = (e) => {
        e.preventDefault();
        // todo validation
        const data = { firstName, lastName , email, password };
        signupUserCredentials(data)
            .catch(err => console.log('THIS IS THE ERROR: ', err) );
    }
    
    const signupUserCredentials = async (data) => {
        console.log(data)
        const url ='http://localhost:4000/api/users/signup';
        const response  = (await axios.post(url, data)).data;
        console.log('RESPONSE')
        console.log(response)
    }

    const handleFirstNameChange = (e) => {
        // todo validation
        setUserFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        // todo validation
        setUserLastName(e.target.value);
    }
    
    const handleEmailChange = (e) => {
        // todo validation
        setUserEmail(e.target.value);       
    }

    const handlePasswordChange = (e) => {
        // todo validation
        validatePassword(e.target.value);
        setUserPassword(e.target.value);       

        if (!e.target.value){
            setPasswordClass('password-strength-bar')
        }    
    }

    function validateEmail(email) {
        // General Email Regex (RFC 5322 Official Standard) - https://emailregex.com/ 
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {

        console.log(password)
        // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        

        const strengthOne = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const strengthTwo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const strengthThree = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
        // ghfEXE222@@
        if (strengthThree.test(password)) {
            setPasswordClass(' password-strength-bar strong');
            return 3;
        }
        
        // eight characters, at least one uppercase letter, one lowercase letter and one number
        // ewdewdDEWD22
        if (strengthTwo.test(password)) {
            setPasswordClass(' password-strength-bar medium');
            return 2;
        }
        
        // eight characters, at least one letter and one number
        // cbjdse11
        if (strengthOne.test(password)) {
            setPasswordClass(' password-strength-bar weak');
            return 1;
        }
        
        setPasswordClass('password-strength-bar invalid');
        return null;
    }

    return (
        <div className="user-signup">
            <form onSubmit={onSubmitSignup}>
                <div className="user-name-box">
                    <div className="text-input">
                        <label htmlFor="userName">first name</label>
                        <input className="form-input" type="text" name="userFirstName" id="userFirstName" value={firstName} onChange={handleFirstNameChange} />
                    </div>
                    <div className="text-input">
                        <label htmlFor="userName">last name</label>
                        <input className="form-input" type="text" name="userLastName" id="userLastName" value={lastName} onChange={handleLastNameChange} />
                    </div>
                </div>
                <div className="text-input">
                    <label htmlFor="userEmail">email:</label>
                    <input className="form-input" type="email" name="userEmail" id="userEmail" value={email} onChange={handleEmailChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userPassword">password</label>
                    <input className="form-input" type="password" name="userPassword" id="userPassword" value={password} onChange={handlePasswordChange}/>
                    <div className="password-strength-bar" className={passwordClass}></div>
                </div>
                <div className="text-input">
                    <button className="btn btn-signup" type="submit">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;