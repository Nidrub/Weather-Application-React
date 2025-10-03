import { useEffect, useRef, useState } from "react";
import "./WeatherScreen.css";
interface Props {
  name: string;
  temp: number;
  activeWeatherScreen: boolean;
  weatherType: string;
  icon: string;
}
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
  //on load the icon from the API
  const [loading, setLoading] = useState(true);
  //if there is an icon and it changes, set loading to true
  useEffect(() => {
    if (icon) {
      setLoading(true);
    }
  }, [icon]);
  //weathere icon url
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  console.log("WeatherScreen icon URL:", weatherIconUrl); // Debugging line
  //day night time based on the icon code from the API
  const isDayTime = icon.includes("d"); // 'd' for day, 'n' for night true if day, false if night
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
        <div className={`weather-screen`}>
          {!activeWeatherScreen ? (
            <h1>Please Write Your City</h1>
          ) : (
            <>
              {loading ? (
                <p>loading...</p>
              ) : (
                <>
                  <h2>{name}</h2>
                  <h3>Temp</h3>
                  <h1>{`${Math.round(temp)}°C`}</h1>
                  <h4>{weatherType}</h4>
                  <h4 className="time">{isDayTime ? "Day" : "Night"}</h4>
                </>
              )}
              <img
                className={loading ? "hidden" : ""}
                src={weatherIconUrl}
                alt="none"
                onLoad={() => setLoading(false)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
