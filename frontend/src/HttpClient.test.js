import * as HttpClient from './HttpClient'
import axios, {AxiosStatic} from 'axios'

describe('httpClient', () => {
  it('calls axios with given parameter when get is called', () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue({})

    HttpClient.get('/some_path')
    HttpClient.get('/some_path2')

    expect(getSpy).toHaveBeenCalledWith('/some_path')
    expect(getSpy).toHaveBeenCalledWith('/some_path2')
  })

  it('Calls axios with given parameter when post is called', () => {
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue({})

    HttpClient.post('/some_path', {key:'value'})
    HttpClient.post('/some_path2', {key2: 'value2'})

    expect(postSpy).toHaveBeenCalledWith('/some_path', {key:'value'}, {"headers": {"Authorization": "Bearer token", "Content-Type": "application/json"}})
    expect(postSpy).toHaveBeenCalledWith('/some_path2', {key2: 'value2'}, {"headers": {"Authorization": "Bearer token", "Content-Type": "application/json"}})
  });

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
