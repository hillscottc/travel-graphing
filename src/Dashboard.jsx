import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { parseStateData } from './travelDataParser'
import * as util from './util'

// I have to use my own cors proxy here, because the dataUrl doesn't have 'Access-Control-Allow-Origin'
const proxyUrl = 'https://fathomless-chamber-37370.herokuapp.com/'
const dataUrl =
  'https://arrivalist-puzzles.s3.amazonaws.com/national_travel.json'

export default function Dashboard() {
  const [travelData, setTravelData] = useState({})
  const [travelState, setTravelState] = useState('')

  useEffect(() => {
    fetch(proxyUrl + dataUrl)
      .then((response) => response.json())
      .then((json) => setTravelData(json.data))
      .catch((e) => {
        console.error('Failed fetch:', e)
      })
  }, [])

  const lineGraphData = parseStateData({ travelData, state: travelState })

  console.log('lineGraphData:', lineGraphData)

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
        <label>State:</label>&nbsp;
        <select onChange={(e) => setTravelState(e.target.value)}>
          <option value=''> Select state </option>
          {util.states.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
        <div>selection is {travelState}</div>
      </section>

      <section>
        <Line
          data={lineGraphData}
          options={{
            title: {
              display: true,
              text: 'Trips per day for ' + travelState,
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
        Fetched data for: {travelState}
        <pre>
          {JSON.stringify(
            parseStateData({ travelData, state: travelState }),
            null,
            2
          )}
        </pre>
        {/*<pre>{JSON.stringify(travelData, null, 2)}</pre>*/}
      </section>
    </main>
  )
}
