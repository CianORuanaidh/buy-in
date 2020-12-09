import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './page_dashboard/DashboardPage';
import LoginPage from './page_login/LoginPage';
import HomePage from './page_home/HomePage';
import SignUp from './page_signup/SignupPage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>

      <Header></Header>
      
      <div>
        <Switch>
          <Route path="/dashboard">
            <DashboardPage></DashboardPage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route path="/">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </div>
      
      <Footer></Footer>

    </Router>
  );
}

export default App;
