import { act, useState } from "react";

interface Props {
  cityName: string;
  state?: string;
  country: string;
  temp: number;
  activeWeatherScreen: boolean;
  weatherType: string;
}
const weatherConditionType = [
  "clear sky",
  "few clouds",
  "scattered clouds",
  "broken clouds",
  "shower rain",
  "rain",
  "thunderstorm",
  "snow",
  "mist",
];

function WeatherScreen({
  cityName,
  state,
  country,
  temp,
  activeWeatherScreen,
  weatherType,
}: Props) {

  const activeHandle = () => {
    if (activeWeatherScreen) {
      return "active";
    }
  };

  const weatherTypeHandle = () => {
    if (weatherConditionType.includes(weatherType)) {
      return weatherType.replace(" ", "-");
    }


    return (
      <>
        <div className={`weather-container ${activeHandle()} ${weatherTypeHandle()}`}>
          <h3 className="">Temp</h3>
          <h1>{temp}</h1>
          <h2>{cityName}</h2>
          <h3>
            {state ? "state: " + state + ", " : ""}
            {"country: " + country}
          </h3>
        </div>
      </>
    );
  };
}
