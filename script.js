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

async function createChart() {
    const weatherData = await fetchWeatherData();
    if (weatherData.length === 0) {
        console.error('No weather data available');
        return;
    }

    const chartData = {
        labels: weatherData.map(entry => entry.air_temperature.toFixed(1)),
        datasets: [{
            label: 'Time',
            data: weatherData.map(entry => entry.time),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Air Temperature (°C)'
                    }
                },
                y: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'MMM D, HH:mm'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });
}

createChart();
