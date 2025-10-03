import { useState, useEffect } from "react";
import "./SearchBar.css";
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
//props for the search bar
interface Props {
  //function that is passed from the parent App component to the SearchBar component
  onCitySelect: (city: City) => void;
}
export function SearchBar({ onCitySelect }: Props) {
  //what the user inputs in the search bar
  const [inputValue, setInputValue] = useState<string>("");
  //the list of cities that match the query, City list of type City
  const [cities, setCities] = useState<City[]>([]);
  //show suggested cities (true the show, false then hide) boolean guaranteed to be true or false
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  //useEffect to fetch cities from the API when the query changes
  useEffect(() => {
    //if the query is greater than 1 character, fetch the cities
    if (inputValue.length > 1) {
      const fetchCities = async () => {
        try {
          //fetch the cities from the API
          console.log("Fetching cities for query:", inputValue);
          console.log("Using API key:", API_key);
          console.log(
            `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_key}`
          );
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_key}`
          );
          //if the response is not ok, throw an error
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          //parse the response as JSON and in City format
          const data: City[] = await response.json();
          //if there is no data, set cities to an empty array and set showSuggestions to false
          if (!data || data.length === 0) {
            setCities([]);
            setShowSuggestions(false);
            return;
          }
          //set the cities to the data from the API (also it gets lat and lon)
          setCities(data);
          //setShowSuggestions to true to show the suggestion list
          setShowSuggestions(true);
        } catch (error) {
          //if there us an error, log it to the console
          console.error("Error fetching city data:", error);
          //also set cities to an empty array and set showSuggestions to false
          setCities([]);
          setShowSuggestions(false);
        }
      };
      //fetch the cities using the function
      fetchCities();
      //show the suggestion list of cities
      setShowSuggestions(true);
    } else {
      //if the query is less than 1 character, clear the cities and hide the suggestions
      setCities([]);
      setShowSuggestions(false);
    }
  }, [inputValue]); //dependency array, when query changes, the useEffect runs

  //handle the Selected city when the user clicks on a city from the suggestion list
  const handleCitySelect = (city: City) => {
    ///set City to -> city
    //clear the input value to the selected city
    setInputValue("");
    //clear the cities array
    setCities([]);
    //hide the suggestions
    setShowSuggestions(false);
    //call the onCitySelect function passed from the parent component with the selected city
    onCitySelect(city);
  };
  //our return statement
  return (
    <>
      <div className="search-bar-container">
        <img
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt="none"
          id="logo"
        />
        <input
          type="text"
          value={inputValue}
          // set the onChange to use the setQuery function to update the query state and it activaes the useEffect
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for a city"
          className="search-input"
          onKeyDown={(e) => {
            //if the user presses the Enter key and there are cities in the list, select the first city
            if (e.key === "Enter" && cities.length > 0) {
              handleCitySelect(cities[0]);
            }
          }}
        />
        {/* if statement (if ShowSuggestions is true and cities has a length greater than 0)  */}
        {showSuggestions && cities.length > 0 && (
          <ul className="cities-list">
            {/* generate a list of cities.map list to use */}
            {cities.map((city, index) => (
              <li
                key={index}
                // when the user clicks on a city, call the handleCitySelect function with the selected city
                onClick={() => handleCitySelect(city)}
              >
                {city.name}
                {city.state ? `, ${city.state}` : ""}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
