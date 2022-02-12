import * as HttpClient from './HttpClient'
import axios from 'axios'

describe('httpClient', () => {
  it('calls axios with given parameter when get is called', () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue({})

    HttpClient.get('/some_path')
    HttpClient.get('/some_path2')

    expect(getSpy).toHaveBeenCalledWith('/some_path')
    expect(getSpy).toHaveBeenCalledWith('/some_path2')
  })

  it('Calls axios with given parameter when post is called', async () => {
    const sampleResponse = { key: 'value' }
    const postParam1 = ['/some_path', { key: 'value' }]
    const data2 = { key2: 'value2' }
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue(sampleResponse)

    await HttpClient.post(...postParam1)
    const result = await HttpClient.post('/some_path2', data2)

    expect(postSpy).toHaveBeenCalledWith(...postParam1)
    expect(postSpy).toHaveBeenCalledWith('/some_path2', data2)
    expect(result).toEqual(sampleResponse)
  })

  it('returns given value when get is called', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      some_key: 'some value',
    })

    const result = await HttpClient.get('/')

    expect(result).toEqual({
      some_key: 'some value',
    })
  })
})
