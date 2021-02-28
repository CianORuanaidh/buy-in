import { useState, useEffect } from 'react';
import UserLogin from './components/Login/UserLogin';
import UserSignup from './components/Signup/Signup'
import './LoginPage.scss';

/*
* LoginPage Page
*/
const LoginPage = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleSigninToggle = () => {
        setIsLogin(state => !state);
    }

    const [userData, setUserData] = useState(null);

    useEffect(() =>{
        // console.log('init function')
        setUserData('NEW USER')
    }, [])

    useEffect(() => {
        // console.log('USE DATA CHANGED')
    },[userData])

    return (
        <div>
            {isLogin &&            
                <UserLogin></UserLogin>
            }
            {!isLogin &&                 
                <UserSignup></UserSignup>
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