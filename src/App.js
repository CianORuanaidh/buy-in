import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
      setUser(user);

    } catch (err) {
      setUser(undefined);
    }
  });

  const setAppUser = (userData) => {
    const { data: user } = userData;
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Router>

      <Header user={user}></Header>
      <div className="page-container">
        <main className="main-container">
          <Switch>
            <Route exact path="/login"
              render={props => {
                if(user) {
                  return <Redirect to="/dashboard"/>
                } 
                return <LoginPage onSetAppUser={(e) => setAppUser(e)} login={true}></LoginPage>
              }} 
            />

            <Route exact path="/signup"
              render={props => {
                if(user) {
                  return <Redirect to="/dashboard"/>
                } 
                return <LoginPage onSetAppUser={(e) => setAppUser(e)} signup={true}></LoginPage>
              }} 
            />

            <Route exact path="/dashboard"
              render={props => {
                if(!user) {
                  return <Redirect to="/"/>
                } 
                return <DashboardPage {...props}/>
              }} 
            />
            
            {/* <Route path="/kitty/optin/:kittyId">
              <KittyPage></KittyPage>
            </Route> */}
            <Route path="/kitty/:kittyId"
              render ={props => {
                if(!user) {
                  return <Redirect to="/"/>
                }
                return <KittyPage {...props}></KittyPage>
              }}
            />
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
