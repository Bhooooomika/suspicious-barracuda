window.initSmartChart = function () {
    const ctx = document.createElement("canvas");
    ctx.id = "realtimeChart";
    document.body.appendChild(ctx);

    const data = {
        labels: [],
        datasets: [{
            label: 'Energy Usage (kW)',
            backgroundColor: '#4BC0C0',
            borderColor: '#4BC0C0',
            data: [],
            fill: false,
            tension: 0.3
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            animation: false,
            responsive: true,
            scales: {
                x: {
                    type: 'realtime',
                    realtime: {
                        duration: 20000,
                        refresh: 1000,
                        delay: 1000,
                        pause: false,
                        ttl: undefined,
                        onRefresh: null
                    }
                },
                y: {
                    beginAtZero: true,
                    suggestedMax: 6
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    };

    const chart = new Chart(ctx, config);
    window.smartChart = chart;
};

window.addDataPoint = function (value) {
    const chart = window.smartChart;
    if (!chart) return;

    chart.data.datasets[0].data.push({
        x: Date.now(),
        y: value
    });
    chart.update('quiet');
};
