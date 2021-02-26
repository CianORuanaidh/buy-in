import './Header.scss';
import { Link } from "react-router-dom";

import { GetUserData } from '../../services/app.hooks';
import { userLogout } from '../../services/api.services';

function Header() {
    const user = GetUserData();
    
    console.log('HEADER')
    console.log(user)


    const onLogoutClick = () => {
        console.log('onLogoutClick')

        userLogout('WHUT')
            .then(resp => { 
                window.location.href = '/'
            })
            .catch(err => console.log('ERROR: ', err))


    }
    return (
        <header>
            <nav className="container">
                <ul>
                    <li className="logo">
                        <Link to="/">B.I.</Link>
                    </li>
                    {
                        user && 
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    }
                    {
                        !user &&
                        <li>
                            <Link className="btn btn-link" to="/login">Login</Link>
                        </li>
                    }
                    {
                        user && 
                        <li>
                            <button className="btn btn-link" onClick={onLogoutClick}>logout</button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
