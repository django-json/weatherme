import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import './App.css';

import CityPage from './pages/city/city.component';
import CityWeather from './components/city-weather/city-weather.component';
import Header from './components/header/header.component';

import { fetchDailyReadingStartAsync } from './redux/weather/weather.actions';

class App extends Component {

  componentDidMount() {
    const { fetchDailyReadingStartAsync } = this.props;

    fetchDailyReadingStartAsync();
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
  fetchDailyReadingStartAsync: () => dispatch(fetchDailyReadingStartAsync())
});

export default connect(null, mapDispatchToProps)(App);
