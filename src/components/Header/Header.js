import './Header.scss';
import { Link } from "react-router-dom";
import { userLogout } from '../../services/api.services';


function Header({user}) {

    // console.log('HEADER')
    // console.log(user)

    const onLogoutClick = () => {
        userLogout()
            .then(resp => window.location.href = '/')
            .catch(err => console.log('ERROR: ', err))
    }

    return (
        <header>
            <nav className="container">
                <ul>
                    {user && 
                    <li>
                        <span>Hi {user.firstName}!</span>
                    </li>
                    }
                    <li className="logo">
                        <Link to="/">BuyIn</Link>
                    </li>
                    {user &&
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    }
                    {!user &&
                        <li>
                            <Link className="btn btn-link" to="/login">Login</Link>
                        </li>
                    }
                    {user &&
                        <li>
                            <button className="btn btn-link" onClick={onLogoutClick}>logout</button>
                        </li>
                    }
                    {!user && 
                        <li>
                            {/* <button className="btn btn-sm get-started">Get started</button> */}
                            {/* <Link className="btn btn-sm get-started" to={{ pathname: '/login', state: {newUser: true}}}>Get started</Link> */}
                            <Link className="btn btn-sm get-started" to="/signup">Get started</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;
