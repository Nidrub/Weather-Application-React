import { useEffect, useRef, useState } from "react";
import "./WeatherScreen.css";
interface Props {
  name: string;
  temp: number;
  activeWeatherScreen: boolean;
  weatherType: string;
  icon: string;
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
const gradients: Record<string, [string, string]> = {
  "clear sky": ["#8bd3f0ff", "#0070d1ff"],
  "few clouds": ["#dedede", "#1a72e6ff"],
  "scattered clouds": ["#d6e4a6ff", "#1a72e6ff"],
  "broken clouds": ["#2476c9ff", "#2f4f4f"],
  "shower rain": ["#afc0c5ff", "#3d434dff"],
  rain: ["#4a90e2", "#142850"],
  thunderstorm: ["#3c4355ff", "#403481ff"],
  snow: ["#e0f7fa", "#ffffff"],
  mist: ["#b9c26dff", "#65b7b9ff"],
  default: ["#dedede", "#dedede"],
};

export function WeatherScreen({
  name,
  temp,
  activeWeatherScreen,
  weatherType,
  icon,
}: Props) {
  
  //weathere icon url
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  console.log("WeatherScreen icon URL:", weatherIconUrl); // Debugging line
  //handles the active class to active or default
  const activeHandle = () => {
    return activeWeatherScreen ? "active" : "";
  };
  // Background gradient transition
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return; // Guard clause for null ref
    const [a, b] = gradients[weatherType] || gradients["default"]; //look for the color, if not found, go to default, since at fist load weatherType is empty so it goes to default
    containerRef.current.style.setProperty("--bg-color-a", a);
    containerRef.current.style.setProperty("--bg-color-b", b);
  }, [weatherType]); //runs every time the weatherType changes

  return (
    <>
      <div ref={containerRef} className="weather-container">
        <div className={`weather-screen ${activeHandle()} `}>
          <h2>{name}</h2>
          <h3>Temp</h3>
          <h1>{`${Math.round(temp)} C`}</h1>
          <h4>{weatherType}</h4>
          <img src={weatherIconUrl} alt="none" />
        </div>
      </div>
    </>
  );
}
