import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './page_dashboard/DashboardPage';
import LoginPage from './page_login/LoginPage';
import HomePage from './page_home/HomePage';
import KittyPage from './page_kitty/KittyPage';
import { getUserWithToken } from './services/api.services';
import './App.scss';

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

      <Header kitty={user}></Header>
      <div className="page-container">
      
        <main className="main-container">
          <Switch>
            <Route path="/dashboard">
              <DashboardPage></DashboardPage>
            </Route>
            <Route path="/login">
              <LoginPage></LoginPage>
            </Route>
            <Route path="/kitty/:kittyId" children={<KittyPage></KittyPage>}>
            </Route>
            <Route path="/">
              <HomePage></HomePage>
            </Route>
          </Switch>
        </main>
      </div>
      
      <Footer></Footer>

    </Router>
  );
}

export default App;
