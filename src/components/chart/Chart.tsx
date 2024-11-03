import React from 'react'
import {Line} from 'react-chartjs-2'
import 'chart.js/auto'

export const Chart = () => {    
    const config = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Total Income',
                    data: [12345, 67891, 9874, 41053, 22398, 69889, 54769, 67832, 68890, 80159, 13563, 94365],
                    borderColor: "#4379EE",
                    tension: 0.1,
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100000,
                    ticks: {
                        stepSize: 20000
                      }
                },
                x: {
                    grid: {
                        drawOnChartArea: false,
                    },
                    offset: true
                },
            },
            plugins: {
                legend: {
                  display: false
                }
            }
        },
    }
  return (
    <div className='w-full h-[80%]'>
        <Line data={config.data} options={config.options}/>
    </div>
  )
}