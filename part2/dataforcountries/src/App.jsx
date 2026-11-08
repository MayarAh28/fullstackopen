import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import CountryInformation from "./components/CountryInformation";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSelectedCountry(null);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  let filteredCountries = search
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <>
      <label>find countries </label>
      <input type="text" value={search} onChange={handleSearch} />

      {search && filteredCountries.length > 10 ? (
        <p>Too many matches, specify another field</p>
      ) : filteredCountries.length === 1 ? (
        <CountryInformation country={filteredCountries[0]} />
      ) : (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common} </span>
              <button onClick={() => handleSelectCountry(country)}>show</button>
            </div>
          ))}
        </div>
      )}
      {selectedCountry && <CountryInformation country={selectedCountry} />}
    </>
  );
};

export default App;
