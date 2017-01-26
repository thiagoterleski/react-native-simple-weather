export const fetchWeather = (city) => {
  let url = `http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&APPID=f106011efd4da51e7d8268d042e021e8`;
  return fetch(url).then((response) => response.json());

}
