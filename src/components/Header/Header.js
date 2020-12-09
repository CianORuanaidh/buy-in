import './Header.scss';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav className="container">
                <ul>
                    <li className="logo">
                        <span>B.I.</span> 
                        <span>(BuyIn)</span>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
