import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { WeatherScreen } from "./components/WeatherScreen/WeatherScreen";
//api key from the .env file
const API_key: string = import.meta.env.VITE_API_KEY;
//interface to define what city is and the lan and lon
interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

function App() {
  //the current temp
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  //the current city
  const [selectedCity, setSelectedCity] = useState<string>("");
  //if there is a city selected, fetch the weather data from the API
  const [activeWeatherScreen, setActiveWeatherScreen] =
    useState<boolean>(false);
  //weather type
  const [weatherType, setWeatherType] = useState<string>("");
  //icon
  const [icon, setIcon] = useState<string>("");

  const handleCitySelect = async (city: City) => {
    setSelectedCity(
      `${city.name}${city.state ? ", " + city.state : ""}, ${city.country}`
    );
    //fetch the weather data from the API
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_key}`
      );
      //set the current temp to the temp from the API
      const data = await response.json();
      setCurrentTemp(data.main.temp); //updates the temperature state
      setActiveWeatherScreen(true); // set true tha weather screen is active
      setWeatherType(data.weather[0].description); //set the weather type from the API
      setIcon(data.weather[0].icon); //set the icon from the API
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCurrentTemp(null); //reset the temperature state on error
    }
  };

  return (
    <>
      {/* the rest is already inside the body automatically */}
      <SearchBar onCitySelect={handleCitySelect} />
      <WeatherScreen
        name={selectedCity}
        temp={currentTemp !== null ? currentTemp : 0} //if currentTemp is null, set it to 0
        activeWeatherScreen={activeWeatherScreen}
        weatherType={weatherType}
        icon={icon}
      />
    </>
  );
}

export default App;
