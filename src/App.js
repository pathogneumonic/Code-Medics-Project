import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LocationContext from "./Components/Emergency/locationContext";
import HomePage from './Pages/Homepage';
import EmergencyPage from './Pages/EmergencyType';
import LocationPage from './Pages/LocationPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

function App() {
  const [location, setLocation] = useState({});

  const getLocation = () => {
    if (!navigator.geolocation) {
      return 'Geolocation is not supported by your browser';
    }
    else {
      navigator.geolocation.getCurrentPosition((position, error) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        if (error) { return 'Could not access location information' };
      })
    }
  }

  getLocation();

  return (
    <main>
      <LocationContext.Provider value={location}>
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/signup" component={SignupPage} exact />
          <Route path="/" component={HomePage} exact />
          <Route path="/emergency" component={EmergencyPage} />
          <Route path="/location" component={LocationPage} />
          <Route component={Error} />
        </Switch>
      </LocationContext.Provider>
    </main>
  );
}

export default App;
