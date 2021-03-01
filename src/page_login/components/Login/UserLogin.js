import './UserLogin.scss';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { userLogin } from '../../../services/api.services';

/*
* Login component
*/
function UserLogin() {
    const history = useHistory();

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    const onSubmitLogin = (e) => {
        // todo validation
        e.preventDefault();
        console.log('onSubmitLogin')

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
                    <label htmlFor="userEmail">user email</label>
                    <input className="form-input" type="email" name="userEmail" id="userEmail" value={userEmail} onChange={handleEmailChange} />
                </div>
                <div className="text-input">
                    <label htmlFor="userPassword">password</label>
                    <input className="form-input" type="password" name="userPassword" id="userPassword" value={userPassword} onChange={handlePasswordChange}/>
                </div>
                <div className="text-input">
                    <button className="btn btn-login" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default UserLogin;