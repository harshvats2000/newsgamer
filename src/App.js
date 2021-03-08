import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import GamePage from './components/GamePage';
import Login from './components/Login';
import PrivateRoute from './routes/PrivateRoute';
import Home from './components/Home';
import firebase from './firebase';
import HowToPlay from './components/HowToPlay';
import Loader from './components/Loader';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
  }, [isAuthenticated]);

  return (
    <div className='App'>
      {loading ? (
        <Loader />
      ) : (
        <Switch>
          <PrivateRoute exact path='/' isAuthenticated={isAuthenticated} user={user} component={Home} />

          <Route path='/login'>
            <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
          </Route>

          <PrivateRoute path={`/game/:id`} isAuthenticated={isAuthenticated} user={user} component={GamePage} />

          <PrivateRoute
            path='/profile/me'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            user={user}
            component={Profile}
          />

          <Route path='/how-to-play'>
            <HowToPlay />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
