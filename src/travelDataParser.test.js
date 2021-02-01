import { getGraphDataTemplate, getByState } from './travelDataParser'

describe('travelDataParser', () => {
  test('getGraphDataTemplate', () => {
    const graphData = getGraphDataTemplate('AK')

    expect(graphData.datasets[0].label).toBe('AK')
  })
})
