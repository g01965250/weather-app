import React, { useState, useEffect } from 'react';
import './App.css';
import { WiStrongWind, /* WiUmbrella, */ WiRaindrop } from 'react-icons/wi';
import { IoEarthOutline } from 'react-icons/io5';
import WeatherIcon from './WeatherIcon';

const currentWeatherData = () => fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-90CBE35F-4A95-4444-AF9E-919F91A57D26&locationName=${'宜蘭'}`)
  .then((response) => response.json()).then((data) => {
    const currentData = data.records.location[0];
    console.log('currentData', currentData);
    return {
      observationTime: currentData.time.obsTime,
      locationName: currentData.locationName,
      temperature: currentData.weatherElement[3].elementValue,
      windSpeed: currentData.weatherElement[2].elementValue,
    };
  }).catch((err) => {
    console.log('error', err);
  });

const forecast = () => fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-90CBE35F-4A95-4444-AF9E-919F91A57D26&locationName=${'宜蘭縣'}`)
  .then((response) => response.json())
  .then((data) => {
    const forecastData = data.records.location[0];
    const locationNames = data.records.location;
    // eslint-disable-next-line no-use-before-define
    const locationNamesList = locationNames.map((item) => <button type="button" className="location-name" onClick={getLocationName}>{item.locationName}</button>);
    console.log('data', locationNames);
    return {
      description: forecastData.weatherElement[0].time[0].parameter.parameterName,
      weatherCode: forecastData.weatherElement[0].time[0].parameter.parameterValue,
      rainPossibility: forecastData.weatherElement[1].time[0].parameter.parameterName,
      locationNamesList,
    };
  }).catch((err) => {
    console.log('error', err);
  });
const getLocationName = (e) => {
  console.log('e', e.nativeEvent.path[0].innerText);
};

function App() {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const [weatherElement, setWeatherElement] = useState({
    observationTime: '',
    locationName: '',
    description: '',
    temperature: 0,
    windSpeed: 0,
    rainPossibility: '',
    weatherCode: 0,
  });
  const fetchData = async () => {
    const [currentWeather, weatherForecast] = await Promise.all([
      currentWeatherData(),
      forecast(),
    ]);
    setWeatherElement({
      ...currentWeather,
      ...weatherForecast,
    });
    setOpen(!open);
  };

  useEffect(() => {
    fetchData();
    console.log(weatherElement);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="weather-wrapper">
          <div className="location">{weatherElement.locationName}</div>
          <div className="descriptipn">
            {weatherElement.observationTime}
            {' '}
            {weatherElement.description}
          </div>
          <div className="current-weather">
            <div className="temperature">
              {weatherElement.temperature}
              ℃
            </div>
            <WeatherIcon
              currentWeatherCode={weatherElement.weatherCode}
              time={weatherElement.observationTime}
            />
          </div>
          <div className="airflow">
            <WiStrongWind className="icon" />
            {weatherElement.windSpeed}
            m/h
          </div>
          <div className="rain">
            <WiRaindrop className="icon" />
            {weatherElement.rainPossibility }
            %
          </div>
          <button className="update" type="button" onClick={fetchData}>
            <IoEarthOutline />
          </button>
        </div>
        <div className={open ? 'other' : 'none'}>
          {weatherElement.locationNamesList}
          <button type="button" className="location-name"><div>台北市</div></button>
        </div>
      </header>
    </div>
  );
}

export default App;
