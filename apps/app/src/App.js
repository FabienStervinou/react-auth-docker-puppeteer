import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Link, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import axios from 'axios';


// Page component 
// import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Logout } from './components/Logout'
import { Profile } from './components/Profile'
import { LandingPage } from './components/LandingPage'

// Route authorization 
import { PrivateRoute } from './utils/PrivateRoute';
import { PublicRoute } from './utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './utils/common';


function App() {

  const [authLoading, setAuthLoading] = useState(true);

    const handleLogout = () => {
      removeUserSession();
      Redirect('/login');
    }
  
    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }

      axios.get(`http://api.react-docker-pupeteer.com/verifyToken`, {}, {
        headers: {
          'auth-token': token,
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).then(response => {
        setUserSession(response.token, response.user);
        setAuthLoading(false);
      }).catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });
    }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">

      <Router>
        
          <nav className="App-header">
            <ul className='flex-row'>
              <li>
                <Link to="/">Landing Page</Link>
              </li>
              {/* <li>
                <Link to="/home">Home</Link>
              </li> */}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        
          <main className="App-main">
            <Switch>
              
              <Route exact path='/' component={ LandingPage }/>
              {/* <PrivateRoute exact path='/home' component={ Home }/> */}
              <PublicRoute path='/login' component={ Login }/>
              <PublicRoute path='/register' component={ Register }/>
              <PrivateRoute path='/profile' component={ Profile }/>
              <PrivateRoute path='/logout' component={ Logout }/>
            </Switch>
          </main>

        </Router>

      <footer className="App-footer">
        code by @FabienStervinou 2020 
      </footer>

    </div>
  );
}

export default App;