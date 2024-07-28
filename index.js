document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');

  document.getElementById('home-link').addEventListener('click', () => {
    content.innerHTML = `
      <h1>Welcome to Our Project!</h1>
      <p>This is the home page.</p>
      <img src="https://images.unsplash.com/photo-1604437998688-6bb58dc963b4?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Home Image" class="home-image">
    `;
  });

  document.getElementById('api1-link').addEventListener('click', () => {
    loadWeatherPage();
  });

  document.getElementById('api2-link').addEventListener('click', () => {
    loadNasaData();
  });

  
  document.querySelector('a[href="#contact"]').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });

 
  document.getElementById('home-link').click();
});

function loadWeatherPage() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="search-bar">
      <input type="text" id="city-input" placeholder="Enter city name" class="w3-input w3-border">
      <button class="w3-button w3-black w3-section" id="search-btn">Search</button>
    </div>
    <div id="weather-data"></div>
  `;

  document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetchWeatherData(city);
  });

  
  fetchWeatherData('London');
}

function fetchWeatherData(city) {
  const apiKey = '0e0e21f3afcbca34775d8619ee15da31';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Weather data fetched:', data);
      localStorage.setItem('weatherData', JSON.stringify(data));
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('weather-data').innerHTML = '<p>Error loading weather data.</p>';
    });
}

function displayWeatherData(data) {
  const weatherDataDiv = document.getElementById('weather-data');
  const city = data.name;
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherDataDiv.innerHTML = `
    <h1>Weather in ${city}</h1>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
  `;
}

function fetchNasaData() {
  const apiKey = 'mumZAniCAIivqiBJM9vGT6d2dKxYzWL29pgey9Bs';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('NASA data fetched:', data);
      localStorage.setItem('nasaData', JSON.stringify(data));
      displayNasaData(data);
    })
    .catch(error => {
      console.error('Error fetching NASA data:', error);
      document.getElementById('content').innerHTML = '<p>Error loading NASA data.</p>';
    });
}

function loadNasaData() {
  const nasaData = localStorage.getItem('nasaData');
  if (nasaData) {
    console.log('Loading NASA data from localStorage');
    displayNasaData(JSON.parse(nasaData));
  } else {
    console.log('Fetching new NASA data');
    fetchNasaData();
  }
}

function displayNasaData(data) {
  const content = document.getElementById('content');
  content.innerHTML = `<h1>NASA Astronomy Picture of the Day</h1>
                       <h2>${data.title}</h2>`;

  if (data.media_type === 'image') {
    content.innerHTML += `<img src="${data.url}" alt="${data.title}" style="max-width: 100%;">`;
  } else if (data.media_type === 'video') {
    content.innerHTML += `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width: 100%; height: 500px;"></iframe>`;
  }

  content.innerHTML += `<p>${data.explanation}</p>`;
}
