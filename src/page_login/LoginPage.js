import './LoginPage.scss';
import UserLogin from './components/Login/UserLogin';

/*
* LoginPage Page
*/
function LoginPage() {
    return (
        <div className="page-container login-page">
            <UserLogin></UserLogin>
        </div>
    )
}

export default LoginPage;