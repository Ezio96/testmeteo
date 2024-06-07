async function fetchWeatherData() {
    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=48.8566&lon=2.3522';

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch data:', response.statusText);
        return [];
    }

    const data = await response.json();
    return data.properties.timeseries.slice(0, 20).map(entry => ({
        time: entry.time,
        air_temperature: entry.data.instant.details.air_temperature
    }));
}

async function createChart() {
    const weatherData = await fetchWeatherData();
    const ctx = document.getElementById('weatherChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weatherData.map(entry => entry.time),
            datasets: [{
                label: 'Air Temperature (°C)',
                data: weatherData.map(entry => entry.air_temperature),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Air Temperature (°C)'
                    }
                }
            }
        }
    });
}

createChart();
