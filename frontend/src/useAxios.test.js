import axios from "axios";
import useAxios from "./useAxios";
import {renderHook} from "@testing-library/react-hooks";
import {faker} from '@faker-js/faker'

it('http get', async () => {
    const randomUrl = faker.internet.url()
    const randomData = faker.helpers.userCard()
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue({data: randomData})

    const {result, waitForNextUpdate} = renderHook(() => useAxios(randomUrl, 'get'))

    await waitForNextUpdate()
    const {current: {response, error}} = result
    expect(getSpy).toHaveBeenCalledWith(randomUrl)
    expect(response).toEqual(randomData)
    expect(error).toBeNull()
})

it('http post', async () => {
    const randomUrl = faker.internet.url()
    const randomData = faker.helpers.userCard()
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValue({data: randomData})

    const {result, waitForNextUpdate} = renderHook(() => useAxios(randomUrl, 'post'))

    await waitForNextUpdate()
    const {current: {response, error}} = result
    expect(postSpy).toHaveBeenCalledWith(randomUrl)
    expect(response).toEqual(randomData)
    expect(error).toBeNull()
})
