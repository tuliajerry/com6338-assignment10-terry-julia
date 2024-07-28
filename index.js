document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  
  document.getElementById('home-link').addEventListener('click', () => {
    content.innerHTML = '<h1>Welcome to Our Project!</h1><p>This is the home page.</p>';
  });

  document.getElementById('api1-link').addEventListener('click', () => {
    fetchWeatherData();
  });

  document.getElementById('api2-link').addEventListener('click', () => {
    fetchMovieData();
  });

 
  document.getElementById('home-link').click();
});

function fetchWeatherData() {
  const content = document.getElementById('content');
  const apiKey = '0e0e21f3afcbca34775d8619ee15da31';
  const city = 'London';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('weatherData', JSON.stringify(data));
      content.innerHTML = `<h1>Weather in ${city}</h1>
                           <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                           <p>Weather: ${data.weather[0].description}</p>`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      content.innerHTML = '<p>Error loading weather data.</p>';
    });
}

function fetchMovieData() {
  const content = document.getElementById('content');
  const apiKey = 'your_tmdb_api_key';
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('movieData', JSON.stringify(data.results));
      content.innerHTML = '<h1>Popular Movies</h1>';
      data.results.forEach(movie => {
        content.innerHTML += `<p>${movie.title}</p>`;
      });
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
      content.innerHTML = '<p>Error loading movie data.</p>';
    });
}

