import { waitFor } from '@testing-library/react'
import {
  changeInputTextByLabel,
  clickButtonWithText,
  expectText,
  getButtonByText,
  httpPostSpy,
  renderComponent,
} from './testUtils'

jest.mock('react-router-dom')

describe('Signup', () => {
  let postSpy
  beforeEach(() => (postSpy = httpPostSpy()))

  it('render', () => {
    const page = renderSignUp()
    const inputTypes = ['email', 'password', 'text']
    const labelNames = ['email', 'password', 'nickname']

    const labelElements = page.container.querySelectorAll('label')
    const inputElements = page.container.querySelectorAll('input')

    expectText(page, 'Sign up')
    expect(labelElements.length).toBe(3)
    expect(inputElements.length).toBe(3)
    labelElements.forEach(({ textContent }, index) => expect(textContent).toBe(labelNames[index]))
    inputElements.forEach(({ type }, index) => expect(type).toBe(inputTypes[index]))
    expect(getRegisterButton(page)).toBeInTheDocument()
  })

  describe('network call', () => {
    beforeEach(() => {
      const { useNavigate } = require('react-router-dom')
      useNavigate.mockImplementation(() => () => {})
    })

    it('send post register request on register button click', async () => {
      const page = renderSignUp()

      await waitFor(() => clickRegisterButton(page))

      expect(postSpy).toHaveBeenCalled()
    })

    it('send email/password/nickname on register button click', () => {
      const page = renderSignUp()
      const { email, nickname, password } = {
        email: 'email@gmail.com',
        nickname: 'someNickname',
        password: 'somePassword',
      }

      changeInputTextByLabel(page, 'email', email)
      changeInputTextByLabel(page, 'password', password)
      changeInputTextByLabel(page, 'nickname', nickname)
      clickRegisterButton(page)

      expect(postSpy).toHaveBeenCalledWith('/signup', {
        email,
        nickname,
        password,
      })
    })
  })

  it('move to sign in page on post', async () => {
    const { useNavigate } = require('react-router-dom')
    const mockedNavigate = jest.fn()
    useNavigate.mockImplementation(() => mockedNavigate)
    const app = renderSignUp(true)

    clickRegisterButton(app)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'))
  })
})

const renderSignUp = (isWithRouter = false) => renderComponent('./SignUp', isWithRouter)
const getRegisterButton = (page) => getButtonByText(page, 'Register')
const clickRegisterButton = (page) => clickButtonWithText(page, 'Register')
