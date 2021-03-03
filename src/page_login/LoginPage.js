import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import UserLogin from './components/Login/UserLogin';
import UserSignup from './components/Signup/UserSignup'
import './LoginPage.scss';

/*
* LoginPage Page
*/
const LoginPage = (props) => {

    console.log(props)

    const [isLogin, setIsLogin] = useState(props.login);

    const handleSigninToggle = () => setIsLogin(state => !state);

    return (
        <div>
            {isLogin &&            
                <UserLogin onSetAppUser={(userData) => props.onSetAppUser(userData)}></UserLogin>
            }
            {!isLogin &&                 
                <UserSignup onSetAppUser={(userData) => props.onSetAppUser(userData)}></UserSignup>
            }
            <div className="signup-login-toggle">
                <div className="text-input">
                    { isLogin ? 
                    <button className="btn btn-link" type="button" onClick={handleSigninToggle}>I'm a new user, sign me up!</button>
                    : 
                    <button className="btn btn-link" type="button" onClick={handleSigninToggle}>I'm an existing user, log me in!</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginPage;