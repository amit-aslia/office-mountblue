import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Homepage from './Components/Homepage';
// import Newtabs from './Components/Newtabs'
import GoogleLogin from './auth/GoogleLogin'

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ height: '100%' }}>
        <Switch>
          <Route exact path="/login" component={GoogleLogin} />
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/Dashboard" component={Dashboard} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
