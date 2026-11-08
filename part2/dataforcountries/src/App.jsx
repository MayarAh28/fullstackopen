import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import CountryInformation from "./components/CountryInformation";
import WeatherInformation from "./components/WeatherInformation";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [lat, long] = selectedCountry?.capitalInfo?.latlng || [];
  
  let filteredCountries = search
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (!lat || !long) return;
    countriesService.getWeather(lat, long).then((data) => {
      setWeather(data);
    });
  }, [lat, long]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSelectedCountry(null);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <label>find countries </label>
      <input type="text" value={search} onChange={handleSearch} />

      {search && filteredCountries.length > 10 ? (
        <p>Too many matches, specify another field</p>
      ) : filteredCountries.length > 1 ? (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common} </span>
              <button onClick={() => handleSelectCountry(country)}>show</button>
            </div>
          ))}
        </div>
      ) : null}
      {selectedCountry && (
        <div>
          <CountryInformation country={selectedCountry} />
          <WeatherInformation
            weather={weather}
            capital={selectedCountry?.capital}
          />
        </div>
      )}
    </>
  );
};

export default App;
