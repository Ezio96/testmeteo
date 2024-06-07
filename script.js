async function fetchWeatherDataFromCSV() {
    const response = await fetch('meteo.csv');
    const data = await response.text();

    // Parse CSV data
    const rows = data.split('\n');
    const weatherData = [];

    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
        const columns = rows[i].split(',');
        if (columns.length >= 2) {
            weatherData.push({
                date: columns[0],
                temperature: parseFloat(columns[1])
            });
        }
    }

    return weatherData;
}

async function displayWeatherData() {
    const weatherData = await fetchWeatherDataFromCSV();
    if (weatherData.length === 0) {
        console.error('No weather data available');
        return;
    }

    const weatherDataContainer = document.getElementById('weatherData');
    weatherDataContainer.innerHTML = '<h2>Weather Data</h2>';

    weatherData.forEach(entry => {
        const paragraph = document.createElement('p');
        paragraph.textContent = `Date: ${entry.date}, Temperature: ${entry.temperature}°C`;
        weatherDataContainer.appendChild(paragraph);
    });
}

displayWeatherData();
