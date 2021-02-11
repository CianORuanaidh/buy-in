import './Signup.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

/*
* Login component
*/
function Signup() {

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
        setUserPassword(e.target.value);       
    }

    return (
        <div className="user-signup">
            <form onSubmit={onSubmitSignup}>
                <div className="text-input">
                    <label htmlFor="userName">first name:</label>
                    <input className="form-input" type="text" name="userFirstName" id="userFirstName" value={firstName} onChange={handleFirstNameChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userName">last name:</label>
                    <input className="form-input" type="text" name="userLastName" id="userLastName" value={lastName} onChange={handleLastNameChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userEmail">email:</label>
                    <input className="form-input" type="email" name="userEmail" id="userEmail" value={email} onChange={handleEmailChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userPassword">password</label>
                    <input className="form-input" type="password" name="userPassword" id="userPassword" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className="text-input">
                    <button className="btn" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;