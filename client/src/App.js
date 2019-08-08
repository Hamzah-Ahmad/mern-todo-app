import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import fire from './config/Fire';
import Tasklist from './components/Tasklist';
import Login from './components/Login';
import SignUp from './components/SignUp';

import './App.css';


function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setuserEmail] = useState(null);
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setuserEmail(user.email);
        setUser(user);
        //localStorage.setItem('user', user.uid);
      } else {
        setUser(null);
        //localStorage.removeItem('user');
      }
    });
  }
  useEffect(() => {
    authListener();
  })
//render={(props) => <Dashboard {...props} isAuthed={true} />}
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' render = {(props) => user ? (<Tasklist {...props} userId = {userId} userEmail = {userEmail}/>) : (<Login/>)}/>
          <Route path = '/signup' component = {SignUp}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
