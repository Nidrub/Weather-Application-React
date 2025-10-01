import { useState, useEffect } from "react";

const API_KEY = "3f60915f4b6d7816508a9f95344d080a";

export default function SearchBar(){

    //input from the search bar
    const [query, setQuery] = useState<string>("");
    //list of items to display in the dropdown in string array
    const [suggestions, setSuggestions] = useState<string[]>([]);
    //boolean to show or hide the dropdown
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    //useEffect to fetch, every time their iany change in the query
    useEffect(() => {
        //if there is more than 2 characters, fetch the data
        if (query.length > 2) {
            const fetchCities = async () => {
                try {
                    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
                    const data = await response.json();
                    //destructure the data to get the name, state, country, lat and lon
                    //map the data to a string array and set the suggestions state
                    setSuggestions(data.map((item: { name: string; state: string; country: string; lat: number; lon: number }) => `${item.name}, ${item.state ? item.state + ', ' : ''}${item.country} (Lat: ${item.lat}, Lon: ${item.lon})`));
                    console.log(data);
                    //show the dropdown
                    setShowSuggestions(true);
                }
                catch (error) {
                    console.error("Error fetching city data:", error);
                }
    };
    fetchCities();
    //if the query is less than 2 characters, clear the suggestions and hide the dropdown
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }}, [query]);
        // handle input change
        const handleSelect = (item:string)=>{
            setQuery(item);
            setShowSuggestions(false);
        };
    return(
        <div className="relative w-64">
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Search for a city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}/>
                {/* if there is showSuggest true and suggestion has more than 0 */}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(item)}>{item}</li>
                    ))}
                </ul>
            )}

        </div>
    )
    
    }