import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";

import CityPageContainer from "./pages/city/city.container";
import CityWeatherContainer from "./components/city-weather/city-weather.container";
import Header from "./components/header/header.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={CityPageContainer} />
        <Route path="/:cityID" component={CityWeatherContainer} />
      </div>
    );
  }
}

export default App;
