import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

// I have to use my own cors proxy here, because the dataUrl doesn't have 'Access-Control-Allow-Origin'
const proxyUrl = 'https://fathomless-chamber-37370.herokuapp.com/'
const dataUrl =
  'https://arrivalist-puzzles.s3.amazonaws.com/national_travel.json'

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

export default function Dashboard() {
  const [travelData, setTravelData] = useState({})
  useEffect(() => {
    fetch(proxyUrl + dataUrl)
      .then((response) => response.json())
      .then((json) => setTravelData(json.data))
      .catch((e) => {
        console.error('Failed fetch:', e)
      })
  }, [])

  const testState = 'AK'

  const getByState = (state) => {
    let graphData = {
      labels: [],
      datasets: [
        {
          label: 'Rainfall',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [],
        },
      ],
    }

    if (isEmpty(travelData)) return {}

    const byState = travelData.filter((x) => x['home_state'] === state)
    graphData.datasets[0].label = state
    graphData.labels = byState.map((x) => x['trip_date'])
    graphData.datasets[0].data = byState.map((x) => x['trip_count'])
    return graphData
  }

  return (
    <main>
      <section>
        <p>
          Create an application to display a 1 page report (dashboard) that
          contains both a line-graph and a map of the 50 states. Use these
          components to visualize a travel dataset. The dataset is an aggregate
          of national travel from each state, by day.
        </p>
        <div>
          In the report include 2 filters to customize the analysis:
          <ul>
            <li>1. Origin State </li>
            <li>2. Date of departure</li>
          </ul>
        </div>
      </section>
      <br />

      <section>
        <Line
          data={getByState(testState)}
          options={{
            title: {
              display: true,
              text: 'Trips per day for ' + testState,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </section>

      <section>
        Fetched data: bystate:
        <pre>{JSON.stringify(getByState(testState), null, 2)}</pre>
        <div>All travelData length: {travelData.length}</div>
        {/*<pre>{JSON.stringify(travelData, null, 2)}</pre>*/}
      </section>
    </main>
  )
}
