const apiKey = '218226592987cb885d5b4196c7841b25';

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
  const cityName = cityInput.value.trim();
  if (cityName === '') {
    weatherResult.innerHTML = '<p>Please enter a city name.</p>';
    weatherResult.classList.remove('hidden');
    return;
  }
  fetchWeather(cityName);
});

async function fetchWeather(city) {
  weatherResult.innerHTML = '<p>Loading...</p>';
  weatherResult.classList.remove('hidden');

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherResult.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="${iconUrl}" alt="${data.weather[0].description}" />
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${capitalize(data.weather[0].description)}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = '<p>City not found. Try again.</p>';
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
