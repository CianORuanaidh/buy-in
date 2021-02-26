import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import { getUserWithToken } from './services/api.services';

import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './page_dashboard/DashboardPage';
import LoginPage from './page_login/LoginPage';
import HomePage from './page_home/HomePage';
import SignUp from './page_signup/SignupPage';

import KittyPage from './page_kitty/KittyPage';

function App() {
  const [user, setUser] = useState(undefined);

  const getUser = useCallback(async function() {

    try {

      const { data: user } = await getUserWithToken();
      console.log(user)

    } catch (err) {
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
          <Route path="/kitty/:kittyId" children={<KittyPage></KittyPage>}>
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
