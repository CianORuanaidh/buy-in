import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './page_dashboard/DashboardPage';
import LoginPage from './page_login/LoginPage';
import HomePage from './page_home/HomePage';
import SignUp from './page_signup/SignupPage';

// import KittyPage from './components/KittyPage/KittyPage';

import KittyPage from './page_kitty/KittyPage';

function App() {
  const [user, setUser] = useState(undefined);

  const getUser = useCallback(async function() {

    try {

      const url ='http://localhost:4000/api/users/getuser';
      const response = await axios.get(url, { withCredentials: true });
      // console.log('ACTIVE USER')
      // console.log(response.data)

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
