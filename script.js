async function fetchWeatherData() {
    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=48.8566&lon=2.3522';

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.properties.timeseries.slice(0, 20).map(entry => ({
            time: new Date(entry.time),
            air_temperature: entry.data.instant.details.air_temperature
        }));
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
    }
}

async function displayWeatherData() {
    const weatherData = await fetchWeatherData();
    if (weatherData.length === 0) {
        console.error('No weather data available');
        return;
    }

    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.innerHTML = '<h2>Weather Data</h2>';

    weatherData.forEach(entry => {
        const time = entry.time.toLocaleString();
        const temperature = entry.air_temperature.toFixed(1);
        const paragraph = document.createElement('p');
        paragraph.textContent = `Time: ${time}, Temperature: ${temperature}°C`;
        weatherDataContainer.appendChild(paragraph);
    });
}

displayWeatherData();
