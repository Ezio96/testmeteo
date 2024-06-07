// Générer des données aléatoires avec des couleurs
const randomData = Array.from({ length: 50 }, () => {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    return {
        x: x,
        y: y,
        backgroundColor: x > 5 ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)' // Vert si x > 5, Rouge si x <= 5
    };
});

// Créer le graphique avec Chart.js
const ctx = document.getElementById('randomChart').getContext('2d');
new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Points aléatoires',
            data: randomData,
            backgroundColor: randomData.map(data => data.backgroundColor), // Couleur des points dynamique
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointStyle: 'circle', // Forme des points
            pointRadius: 10 // Taille des points
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 10
            },
            y: {
                type: 'linear',
                min: 0,
                max: 10
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 48 // Taille de police de la légende
                    }
                }
            }
        }
    }
});
