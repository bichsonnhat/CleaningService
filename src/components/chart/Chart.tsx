import React, { FC } from 'react'
import {Line} from 'react-chartjs-2'
import 'chart.js/auto'

type ChartProps = {
    totalIncome: number[];
}

export const Chart: FC<ChartProps> = ({totalIncome}) => {    
    const config = {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Total Income',
                    data: totalIncome,
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
                    max: 20000,
                    ticks: {
                        stepSize: 5000,
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