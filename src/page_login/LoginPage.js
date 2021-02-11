import { useState, useEffect, useReducer } from 'react';

import './LoginPage.scss';
import UserLogin from './components/Login/UserLogin';

import UserSignup from '../page_signup/SignupPage';

/*
* LoginPage Page
*/



function LoginPage() {
    const [isOn, toggleIsOn] = useToggle();
    
    function useToggle(initialValue = false) {
        return useReducer((state) => !state, initialValue);  
    }


    const [userData, setUserData] = useState(null);

    // console.log('userData')
    // console.log(userData)

    useEffect(() =>{
        // console.log('init function')
        setUserData('NEW USER')
    }, [])

    useEffect(() => {
        // console.log('USE DATA CHANGED')
    },[userData])

    // console.log('LOGIN PAGE')
    return (
        <div>
            {isOn &&            
                <div>
                    <p>have user: TRUE login</p>
                    <div className="page-container login-page">
                        <UserLogin></UserLogin>
                    </div>
                </div>
            }
            {!isOn &&                 
                <div>
                    <p>have user: {userData} signup</p>
                    <div className="page-container login-page">
                        <UserSignup></UserSignup>
                    </div>
                </div>
            }
            <div className="">
                <div className="text-input" onClick={toggleIsOn}>
                    <button className="btn btn-link" type="button">I'm a new use, sign me up</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;