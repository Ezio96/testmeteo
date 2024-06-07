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

async function createChart() {
    const weatherData = await fetchWeatherDataFromCSV();
    if (weatherData.length === 0) {
        console.error('No weather data available');
        return;
    }

    const labels = weatherData.map(entry => entry.date);
    const data = weatherData.map(entry => entry.temperature);

    const ctx = document.getElementById('weatherChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'MMM D, YYYY'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });

    document.getElementById('downloadPdf').addEventListener('click', function() {
        const canvas = document.getElementById('weatherChart');
        const imgData = canvas.toDataURL('image/png');

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Calculate width and height to fit A4 page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('weather_chart.pdf');
    });
}

createChart();
