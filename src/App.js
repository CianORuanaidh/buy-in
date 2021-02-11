import { useEffect, useState, useCallback } from 'react';

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
import axios from 'axios';

function App() {
  const [user, setUser] = useState(undefined);

  const getUser = useCallback(async function() {
    console.log('GET USER FUNCTION')

    try {
      console.log('SETTING COOKIES')
      const url ='http://localhost:4000/api/users/getuser';
      const response = await axios.get(url, { withCredentials: true });
      console.log('response')
      console.log(response)

    } catch (err) {
      console.log('ERROR: ', err)
      setUser(undefined);
    }



  });

  useEffect(() => {
    getUser();
  }, [getUser])

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
