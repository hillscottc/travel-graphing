import React from 'react'

function getGraphDataTemplate(legendLabel = '') {
  return {
    labels: [],
    datasets: [
      {
        label: legendLabel,
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  }
}

export const getByState = ({ travelData, state }) => {
  let graphData = getGraphDataTemplate(state)

  if (!travelData || Object.keys(travelData).length === 0) return {}

  const byState = travelData.filter((x) => x['home_state'] === state)
  // console.log('LOCAL GOT BYSTATE:', byState)
  graphData.labels = byState.map((x) => x['trip_date'])
  graphData.datasets[0].data = byState.map((x) => x['trip_count'])
  return graphData
}
