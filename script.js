// Chargement des données CSV
fetch('meteo.csv')
    .then(response => response.text())
    .then(data => {
        // Diviser les lignes du fichier CSV
        const rows = data.trim().split('\n');
        // Extraire les en-têtes et les données
        const headers = rows[0].split(',');
        const values = rows.slice(1).map(row => row.split(','));
        
        // Extraire les dates et les températures
        const dates = values.map(row => row[0]);
        const temperatures = values.map(row => parseFloat(row[1]));

        // Créer le graphique avec Chart.js
        const ctx = document.getElementById('temperatureChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Température (°C)',
                    data: temperatures,
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
    })
    .catch(error => console.error('Erreur:', error));
