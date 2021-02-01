import React from 'react'
import moment from 'moment'

export const getRawDataByState = ({ travelData, state }) => {
  return travelData.filter((x) => x['home_state'] === state)
}

// returns raw data with concat totals for each day
export const concatStateDays = ({ travelData, state }) => {
  if (!travelData || Object.keys(travelData).length === 0) return {}

  let foundDays = []
  let results = []

  for (let i = 0; i < travelData.length; i++) {
    if (travelData[i]['home_state'] !== state) continue
    const tripDate = moment(travelData[i]['trip_date']).format('MM/DD/YYYY')

    if (!foundDays.includes(tripDate)) {
      foundDays.push(tripDate)
      travelData[i]['trip_date'] = tripDate
      results.push(travelData[i])
    } else {
      for (let j = 0; j < results.length; j++) {
        if (results[j]['trip_date'] === tripDate) {
          results[j]['trip_count'] += travelData[i]['trip_count']
          break
        }
      }
    }
  }
  return results
}

export function getGraphDataTemplate(legendLabel = '') {
  const template = {
    labels: [],
    datasets: [
      {
        label: legendLabel,
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(0,0,0,1)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 2,
        data: [],
      },
    ],
  }
  // Returns a clone of this data, to prevent ref problems.
  return JSON.parse(JSON.stringify(template))
}

export const parseStateData = ({ travelData, state }) => {
  if (!travelData || Object.keys(travelData).length === 0) return {}

  const fixedData = concatStateDays({ travelData, state })
  let results = getGraphDataTemplate(state)

  for (let i = 0; i < fixedData.length; i++) {
    if (fixedData[i]['home_state'] !== state) continue
    if (!results.labels.includes(fixedData[i]['trip_date'])) {
      results.labels.push(fixedData[i]['trip_date'])
      results.datasets[0]['data'].push(fixedData[i]['trip_count'])
    } else {
      results.datasets[0]['data'][0] += fixedData[i]['trip_count']
    }
  }
  return results
}
