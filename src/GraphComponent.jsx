import { useEffect, useState } from 'react'

// I have to use my own cors proxy here, because the dataUrl doesn't have 'Access-Control-Allow-Origin'
const proxyUrl = 'https://fathomless-chamber-37370.herokuapp.com/'
const dataUrl =
  'https://arrivalist-puzzles.s3.amazonaws.com/national_travel.json'

export default function GraphComponent() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(proxyUrl + dataUrl)
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((e) => {
        console.error('Failed fetch:', e)
      })
  }, [])

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
        Fetched data:
        <div>Length: {data.length}</div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </main>
  )
}
