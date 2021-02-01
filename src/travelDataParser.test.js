import {
  getGraphDataTemplate,
  parseStateData,
  concatStateDays,
} from './travelDataParser'

// Returns a clone of the data, to prevent ref problems.
function getRawData() {
  const rawData = [
    {
      trip_date: '2019-12-08T08:00:00.000Z',
      home_state: 'AK',
      trip_count: 2,
    },
    {
      trip_date: '2019-12-08T08:00:00.000Z',
      home_state: 'AK',
      trip_count: 2,
    },
    {
      trip_date: '2020-12-08T08:00:00.000Z',
      home_state: 'AK',
      trip_count: 10,
    },
    {
      trip_date: '2019-12-08T08:00:00.000Z',
      home_state: 'AL',
      trip_count: 999,
    },
  ]
  return JSON.parse(JSON.stringify(rawData))
}

describe('travelDataParser', () => {
  test('getGraphDataTemplate', () => {
    const graphData = getGraphDataTemplate('AK')
    expect(graphData.datasets[0].label).toBe('AK')
  })

  test('concatStateDays', () => {
    const travelData = getRawData()
    const results = concatStateDays({ travelData, state: 'AK' })
    const expected = [
      {
        trip_date: '12/08/2019',
        home_state: 'AK',
        trip_count: 4,
      },
      {
        trip_date: '12/08/2020',
        home_state: 'AK',
        trip_count: 10,
      },
    ]

    expect(results).toEqual(expected)
  })

  test('getByState', () => {
    const travelData = getRawData()

    const results = parseStateData({ travelData, state: 'AK' })
    const expected = {
      labels: ['12/08/2019', '12/08/2020'],
      datasets: [
        {
          label: 'AK',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [4, 10],
        },
      ],
    }
    expect(results).toEqual(expected)
  })
})
