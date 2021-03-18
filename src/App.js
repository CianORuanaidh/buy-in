import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './page_dashboard/DashboardPage';
import LoginPage from './page_login/LoginPage';
import HomePage from './page_home/HomePage';
import KittyPage from './page_kitty/KittyPage';
import { getUserWithToken } from './services/api/api.services';
import './App.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [user, setUser] = useState(undefined);


  const getUser = useCallback(async function() {

    try {
      const { data: user } = await getUserWithToken();
      // console.log(user)
      setUser(user);
      setIsLoading(false);

    } catch (err) {
      setUser(undefined);
      setIsLoading(false);
    }
  });

  const setAppUser = (userData) => {
    const { data: user } = userData;
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [])

  // console.log(user)

  if (isLoading) {
    return (
        <div className="is-loading">
          LOADING...
        </div>
    )
  } 

  return (
    <Router>

      <Header user={user}></Header>
      
      <div className="page-container">
        <main className="main-container">
          <Switch>

            {/* LOGIN ROUTE */}
            <Route exact path="/login"
              render={props => {
                if(user) {
                  return <Redirect to="/dashboard"/>
                } 
                return <LoginPage onSetAppUser={(e) => setAppUser(e)} login={true}></LoginPage>
              }} 
            />

            {/* SIGNUP ROUTE */}
            <Route exact path="/signup"
              render={props => {
                if(user) {
                  return <Redirect to="/dashboard"/>
                } 
                return <LoginPage onSetAppUser={(e) => setAppUser(e)} signup={true}></LoginPage>
              }} 
            />

            {/* DASHBOARD ROUTE */}
            <Route exact path="/dashboard"
              render={props => {
                if(!user) {
                  return <Redirect to="/"/>
                } 
                return <DashboardPage {...props}/>
              }} 
            />

            {/* KITTY PAGE ROUTE */}
            <Route exact path="/kitty/:kittyId"
              render ={props => {
                if(!user) {
                  return <Redirect to="/"/>
                }
                return <KittyPage {...props}></KittyPage>
              }}
            />

            {/* OPT IN PAGE  */}
            <Route path="/public/kitty/join/">
              <h1>JOIN THE GAME HERE</h1>
            </Route>


            {/* HOME PAGE ROUTE */}
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
