import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { parseStateData } from './travelDataParser'
import USAMap from 'react-usa-map'

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

  const mapHandler = (e) => {
    setTravelState(e.target.dataset.name)
  }

  const lineGraphData = parseStateData({ travelData, state: travelState })
  console.log(`Graph data for ${travelState}:`, lineGraphData)

  return (
    <main>
      <h1 className='heading'>Trip Count by State</h1>

      <section className='map'>
        <USAMap onClick={mapHandler} />
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
    </main>
  )
}
