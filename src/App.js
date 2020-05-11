import React, { Component } from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";

import "./App.css";

import CityPageContainer from "./pages/city/city.container";
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
        <Route exact path="/" component={CityPageContainer} />
        <Route path="/:cityID" component={CityWeather} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDailyReadingStart: () => dispatch(fetchDailyReadingStart()),
});

export default connect(null, mapDispatchToProps)(App);
