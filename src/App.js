import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/Homepage';
import EmergencyPage from './Pages/EmergencyType';
import LocationPage from './Pages/LocationPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        <Route path="/" component={HomePage} exact />
        <Route path="/emergency" component={EmergencyPage} />
        <Route path="/location" component={LocationPage} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
