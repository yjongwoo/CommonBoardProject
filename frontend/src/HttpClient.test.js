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
