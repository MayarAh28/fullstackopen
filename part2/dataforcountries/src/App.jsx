import { useEffect, useState } from "react";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);
  const handleSearch = (e) => {
    setSearch(e.target.value);
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
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital {filteredCountries[0].capital}</p>
          <p>Area {filteredCountries[0].area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(filteredCountries[0]?.languages || {}).map(
              (language) => (
                <li key={language}>{language}</li>
              )
            )}
          </ul>
          <img src={filteredCountries[0].flags.png} />
        </div>
      ) : (
        <div>
          {filteredCountries.map(country=><p>{country.name.common}</p>)}
        </div>
      )}
    </>
  );
};

export default App;
