import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import CityWeatherPage from './pages/city-weather/city-weather.component';
import Header from './components/header/header.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/city-weather" component={CityWeatherPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
