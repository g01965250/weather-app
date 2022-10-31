/* eslint-disable linebreak-style */
import React from 'react';
import {
  WiDayCloudy, WiDaySunny, WiDayRainMix, WiDaySleetStorm,
  WiDaySnow, WiDayFog, WiNightClear, WiNightCloudy, WiNightRainMix,
  WiNightSleetStorm, WiNightFog, WiNightSnow,
} from 'react-icons/wi';

// eslint-disable-next-line no-unused-vars
const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [24, 25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12,
    13, 14, 19, 20, 29, 30,
    31, 32, 38, 39,
  ],
  isSnowing: [23, 37, 42],
};
// eslint-disable-next-line no-unused-vars
const weatherIcons = {
  day: {
    isThunderstorm: <WiDaySleetStorm />,
    isClear: <WiDaySunny />,
    isCloudyFog: <WiDayFog />,
    isCloudy: <WiDayCloudy />,
    isPartiallyClearWithRain: <WiDayRainMix />,
    isSnowing: <WiDaySnow />,
  },
  night: {
    isThunderstorm: <WiNightSleetStorm />,
    isClear: <WiNightClear />,
    isCloudyFog: <WiNightFog />,
    isCloudy: <WiNightCloudy />,
    isPartiallyClearWithRain: <WiNightRainMix />,
    isSnowing: <WiNightSnow />,
  },
};

// eslint-disable-next-line react/prop-types, no-unused-vars, react/function-component-definition
const WeatherIcon = ({ currentWeatherCode, time }) => {
  const weathercode = Object.keys(weatherTypes)
    .find((key) => weatherTypes[key]
      .indexOf(Number(currentWeatherCode)) !== -1);
  let dayAndNight = '';
  const date = new Date(time).getHours();
  if (date > 6 && date < 18) {
    dayAndNight = 'day';
  } else {
    dayAndNight = 'night';
  }
  return (
    <div className="weathericon">{weatherIcons[dayAndNight][weathercode]}</div>
  );
};

export default WeatherIcon;
