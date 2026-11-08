const WeatherInformation = ({ weather, capital }) => {
  let temperature = weather?.main?.temp;
  let iconCode = weather?.weather?.[0]?.icon;
  let image_url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  let wind = weather?.wind?.speed;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {temperature} Celsius</p>
      <img src={image_url} alt="weather_icon" />
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default WeatherInformation;
