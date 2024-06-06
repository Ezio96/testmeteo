const temperatureData = [
    { date: '2010-01-01', temperature: 2.3 },
    { date: '2010-01-02', temperature: 1.8 },
    { date: '2010-01-03', temperature: 1.2 },
    { date: '2010-01-04', temperature: 2.3 },
    { date: '2010-01-05', temperature: 1.8 },
    { date: '2010-01-06', temperature: 1.2 },
    { date: '2010-01-07', temperature: 2.3 },
    { date: '2010-01-08', temperature: 1.8 },
    { date: '2010-01-09', temperature: 5.2 },
    { date: '2010-01-10', temperature: 2.3 },
    { date: '2010-01-11', temperature: 4.8 },
    { date: '2010-01-12', temperature: 4.2 },
    { date: '2010-01-13', temperature: 6.3 },
    { date: '2010-01-14', temperature: 2.8 },
    { date: '2010-01-15', temperature: 7.2 },
    // Ajoutez les autres données ici...
];

// Créer le graphique avec Chart.js
const ctx = document.getElementById('temperatureChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: temperatureData.map(data => data.date),
        datasets: [{
            label: 'Température (°C)',
            data: temperatureData.map(data => data.temperature),
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
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});
