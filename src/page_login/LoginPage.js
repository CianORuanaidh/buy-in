import { Link } from 'react-router-dom';
import UserLogin from './components/Login/UserLogin';
import UserSignup from './components/Signup/UserSignup'
import './LoginPage.scss';

/*
* LoginPage Page
*/
const LoginPage = (props) => {
    return (
        <div>
            {props.login &&            
                <UserLogin onSetAppUser={(userData) => props.onSetAppUser(userData)}></UserLogin>
            }
            {props.signup &&                 
                <UserSignup onSetAppUser={(userData) => props.onSetAppUser(userData)}></UserSignup>
            }
            <div className="signup-login-toggle">
                <div className="text-input">
                    { props.login && 
                    <Link to="/signup">I'm a new user, sign me up!</Link>
                    }
                    { props.signup &&
                    <Link to="/login">I'm an existing user, log me in!</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginPage;