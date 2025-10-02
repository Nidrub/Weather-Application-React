import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
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
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCurrentTemp(null); //reset the temperature state on error
    }
  };

  return (
    <>
      {/* the rest is already inside the body automatically */}
      <SearchBar onCitySelect={handleCitySelect} />
      <div className="weaather-container">
        {/* if there is a SelectedCity and current Temp is not null */}
        {selectedCity && currentTemp !== null && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{selectedCity}</h2>
            <p className="text-xl">Current Temperature: {currentTemp}°C</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
