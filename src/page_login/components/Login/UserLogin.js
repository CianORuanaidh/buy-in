import './UserLogin.scss';
import { useState, useEffect } from 'react';

/*
* Login component
*/
function UserLogin() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");

    const onSubmitLogin = (e) => {
        e.preventDefault();
        // todo validation
        const data = { userName: userName, userEmail: userEmail, userPassword: userPassword };
        postUserCredentials(data);
    }
    
    const postUserCredentials = async (data) => {
        
        const url ='http://localhost:4000/api/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const parsed = await response.json();

        console.log('RESPONSE')
        console.log(parsed)
    }

    const handleNameChange = (e) => {
        // todo validation
        setUserName(e.target.value);
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
        <div className="user-login">
            <form onSubmit={onSubmitLogin}>
                <div className="text-input">
                    <label htmlFor="userName">user name:</label>
                    <input className="form-input" type="tet" name="userName" id="userName" value={userName} onChange={handleNameChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userEmail">user email:</label>
                    <input className="form-input" type="email" name="userEmail" id="userEmail" value={userEmail} onChange={handleEmailChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userPassword">password</label>
                    <input className="form-input" type="password" name="userPassword" id="userPassword" value={userPassword} onChange={handlePasswordChange}/>
                </div>
                <div className="text-input">
                    <button className="btn" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default UserLogin;