import { useState, useEffect } from 'react';

import './LoginPage.scss';
import UserLogin from './components/Login/UserLogin';

import UserSignup from '../page_signup/SignupPage';

/*
* LoginPage Page
*/

function LoginPage() {
    const [userData, setUserData] = useState(null);


    console.log('userData')
    console.log(userData)

    useEffect(() =>{
        console.log('init function')
        setUserData('NEW USER')
    }, [])

    useEffect(() => {
        console.log('USE DATA CHANGED')
    },[userData])


    console.log('LOGIN PAGE')
    return (
        <div>
            {userData &&            
                <div>
                    <p>have user: {userData} login</p>
                    <div className="page-container login-page">
                        <UserLogin></UserLogin>
                    </div>
                </div>
            }
            {!userData &&                 
                <div>
                    <p>have user: {userData} signup</p>
                    <div className="page-container login-page">
                        <UserSignup></UserSignup>
                    </div>
                </div>
            }
        </div>
    )
}

export default LoginPage;