const apiKey = 'VOTRE_CLE_API';  // Remplacez par votre clé API OpenWeatherMap
const city = 'Bruxelles';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp;
        const weather = data.weather[0].main.toLowerCase();
        const weatherIcon = {
            clear: '☀️',
            clouds: '☁️',
            rain: '🌧️',
            snow: '❄️',
            drizzle: '🌦️',
            thunderstorm: '⛈️',
            mist: '🌫️'
        };

        document.getElementById('weather-icon').textContent = weatherIcon[weather] || '🌈';

        const ctx = document.getElementById('temperatureChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Now'],
                datasets: [{
                    label: 'Température (°C)',
                    data: [temp],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Erreur:', error));
