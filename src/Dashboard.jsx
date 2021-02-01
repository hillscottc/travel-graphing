import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { parseStateData } from './travelDataParser'

// I have to use my own cors proxy here, because the dataUrl doesn't have 'Access-Control-Allow-Origin'
const proxyUrl = 'https://fathomless-chamber-37370.herokuapp.com/'
const dataUrl =
  'https://arrivalist-puzzles.s3.amazonaws.com/national_travel.json'

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

  const lineGraphData = parseStateData({ travelData, state: testState })

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
        <Line
          data={lineGraphData}
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
        <div>All travelData length: {travelData.length}</div>
        raw data for AL: {/*<pre>*/}
        {/*  {JSON.stringify(*/}
        {/*    getRawDataByState({ travelData, state: 'AL' }),*/}
        {/*    null,*/}
        {/*    2*/}
        {/*  )}*/}
        {/*</pre>*/}
        {/*<pre>{JSON.stringify(travelData, null, 2)}</pre>*/}
      </section>
    </main>
  )
}
