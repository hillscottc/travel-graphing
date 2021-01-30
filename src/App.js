import { Component } from 'react'
import Dashboard from './Dashboard.jsx'
import SampleGraph from './SampleGraph.jsx'
import './app.styles.scss'

class App extends Component {
  render() {
    return (
      <div>
        <SampleGraph />
        <Dashboard />
      </div>
    )
  }
}

export default App
