///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Représentation graphique

function generateGraphsPlot(graphData, canvasId) {
    if (!Array.isArray(graphData) || graphData.length === 0) {
        console.error("Données invalides ou tableau vide fourni à generateGraphs; un tableau non vide est attendu:", graphData);
        return;
    }

    var datasets = [
        // { label: "Processed Count", data: [], borderColor: 'rgb(255, 99, 132)', fill: false },
        // { label: "Note de frais historique - Chiffre d'affaire", data: [], borderColor: 'rgb(54, 162, 235)', fill: false },
        // { label: "Prime", data: [], borderColor: 'rgb(153, 102, 255)', fill: false },
        { label: "NdF : bénéfices réels", data: [], borderColor: 'rgb(75, 192, 192)', fill: false },
        { label: "Primes :bénéfices réels", data: [], borderColor: 'rgb(98, 0, 234)', fill: false }
        
    ];

 

    graphData.forEach((item, index) => {
        let xValue = parseFloat(item.processedCount); // On utilise processedCount comme valeur x

        //datasets[0].data.push({ x: xValue, y: xValue }); // Ici on affiche processedCount sur le graphique pour le visualiser
        //datasets[1].data.push({ x: xValue, y: parseFloat(item.fraisHistorique) });
        //datasets[3].data.push({ x: xValue, y: parseFloat(item.prime) });

        datasets[0].data.push({ x: xValue, y: parseFloat(item.beneficeReel) });
        datasets[1].data.push({ x: xValue, y: parseFloat(item.primeBenefice) });

        
    });

    var canvas = document.getElementById(canvasId);
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = canvasId;
        document.body.appendChild(canvas);
    }

    var ctx = canvas.getContext('2d');

    // Destruction du graphique existant s'il existe
    if (window[canvasId + 'Chart']) {
        window[canvasId + 'Chart'].destroy();
    }

    // Création d'un nouveau graphique
    window[canvasId + 'Chart'] = new Chart(ctx, {
        type: 'line',  // Changed to line to better visualize processedCount as a time series
        data: {
            labels: graphData.map(item => parseFloat(item.processedCount)),
            datasets: datasets
        },
        options: {
            animation: {
                duration: 1000,  // Durée de l'animation en ms
                easing: 'easeOutBounce'  // Type d'animation
            },
            legend: {
                labels: {
                    fontColor: 'blue',  // Couleur des étiquettes de légende
                    fontSize: 14,
                    fontStyle: 'bold'
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 30,
                    top: 30,
                    bottom: 10
                }
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += parseFloat(tooltipItem.yLabel).toFixed(2);
                        return label;
                    }
                }
            },

            scales: {
                x: {
                    type: 'linear',  // Assure que l'axe des x est traité comme des valeurs numériques
                    position: 'bottom',
                    ticks: {
                        callback: function (value, index, values) {
                            // Cette fonction transforme les indices en étiquettes plus lisibles
                            return 'Match ' + (index + 1);
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }

    });
}



function graph() {
    const tbody = document.getElementById('dataBody');

    for (let i = 0; i < saison.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${saison[i]}</td>
            <td>${HeadLMamicaux[i]}</td>
            <td>${HeadLMSR[i]}</td>
            <td>${HeadLMPO[i]}</td>
            <td>${HeadD1amicaux[i]}</td>
            <td>${HeadD1SR[i]}</td>
            <td>${HeadD1PO[i]}</td>
            <td>${JDLamicaux[i]}</td>
            <td>${JDLLMSR[i]}</td>
            <td>${JDLLMPO[i]}</td>
            <td>${JDLamicauxD1[i]}</td>
            <td>${JDLD1SR[i]}</td>
            <td>${JDLD1PO[i]}</td>
            <td>${GrandDeplacement[i]}</td>
            <td>${Hotel[i]}</td>
            <td>${Km[i]}</td>
            <td>${Repas[i]}</td>
            <td>${TauxInflation[i]}</td>
            <td>${Gazole[i]}</td>
            <td>${VariationKmArray[i]}</td>
        `;
        tbody.appendChild(tr);
    }
}

/*
    // Création d'un contexte de dessin sur le canvas
   // const ctx = document.getElementById('myChart').getContext('2d');

    // Création du graphe
    const myChart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: saison,
        datasets: [{
            label: 'HeadL Mamicaux',
            data: HeadLMamicaux,
            borderColor: 'red',
            fill: false
        }, {
            label: 'Head LM SR',
            data: HeadLMSR,
            borderColor: 'blue',
            fill: false
        }, {
            label: 'Head LM PO',
            data: HeadLMPO,
            borderColor: 'green',
            fill: false
        }, {
            label: 'Head D1 amicaux',
            data: HeadD1amicaux,
            borderColor: 'orange',
            fill: false
        }, {
            label: 'Head D1 SR',
            data: HeadD1SR,
            borderColor: 'purple',
            fill: false
        }, {
            label: 'Head D1 PO',
            data: HeadD1PO,
            borderColor: 'brown',
            fill: false
        }, {
            label: 'JDL amicaux',
            data: JDLamicaux,
            borderColor: 'black',
            fill: false
        }, {
            label: 'JDL LM SR',
            data: JDLLMSR,
            borderColor: 'cyan',
            fill: false
        }, {
            label: 'JDL LM PO',
            data: JDLLMPO,
            borderColor: 'magenta',
            fill: false
        }, {
            label: 'JDL D1 amicaux',
            data: JDLamicauxD1,
            borderColor: 'yellow',
            fill: false
        }, {
            label: 'JDL D1 SR',
            data: JDLD1SR,
            borderColor: 'lime',
            fill: false
        }, {
            label: 'JDL D1 PO',
            data: JDLD1PO,
            borderColor: 'olive',
            fill: false
        }, {
            label: 'Grand Déplacement',
            data: GrandDeplacement,
            borderColor: 'navy',
            fill: false
        }, {
            label: 'Hôtel',
            data: Hotel,
            borderColor: 'teal',
            fill: false
        }, {
            label: 'Km',
            data: Km,
            borderColor: 'maroon',
            fill: false
        }, {
            label: 'Repas',
            data: Repas,
            borderColor: 'pink',
            fill: false
        }, {
            label: 'Taux d\'inflation',
            data: TauxInflation,
            borderColor: 'silver',
            fill: false
        }, {
            label: 'Gazole',
            data: Gazole,
            borderColor: 'gold',
            fill: false
        }, {
            label: 'Variation Km',
            data: VariationKmArray,
            borderColor: 'indigo',
            fill: false
        }]
    }//,
    //options: {
    // responsive: true,
        //scales: {
        // yAxes: [{
            //  ticks: {
                //  beginAtZero: true
            // }
        //  }]
    // }
    // }
    }); */
