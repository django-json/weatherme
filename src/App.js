import React, { Component } from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";

import "./App.css";

import CityPage from "./pages/city/city.component";
import CityWeather from "./components/city-weather/city-weather.component";
import Header from "./components/header/header.component";

import { fetchDailyReadingStart } from "./redux/weather/weather.actions";

class App extends Component {
  componentDidMount() {
    const { fetchDailyReadingStart } = this.props;

    fetchDailyReadingStart();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={CityPage} />
        <Route path="/:cityID" component={CityWeather} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDailyReadingStart: () => dispatch(fetchDailyReadingStart()),
});

export default connect(null, mapDispatchToProps)(App);
