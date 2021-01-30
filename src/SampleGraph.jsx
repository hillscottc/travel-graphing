import React from 'react'
import { Line } from 'react-chartjs-2'

// FROM https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react

const graphData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
}

export default function SampleGraph() {
  return (
    <div>
      <Line
        data={graphData}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  )
}
