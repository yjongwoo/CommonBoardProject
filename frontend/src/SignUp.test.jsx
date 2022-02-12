import { fireEvent, render, waitFor } from '@testing-library/react'
import * as HttpClient from './HttpClient'

describe('Signup', () => {
  let getSpy, postSpy

  beforeEach(() => {
    getSpy = jest.spyOn(HttpClient, 'get').mockResolvedValue({})
    postSpy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})
  })

  describe('render', () => {
    let SignUp, page
    beforeEach(() => {
      SignUp = require('./SignUp').default
      page = render(<SignUp />)
    })

    it('There is "Sign up" text', () => {
      expect(page.getByText('Sign up')).toBeInTheDocument()
    })

    it('There are email, password, nickname labels and inputs', () => {
      const inputTypes = ['email', 'password', 'text']
      const labelNames = ['email', 'password', 'nickname']

      const labelElements = page.container.querySelectorAll('label')
      const inputElements = page.container.querySelectorAll('input')

      expect(labelElements.length).toBe(3)
      expect(inputElements.length).toBe(3)
      labelElements.forEach((labelElement, index) => {
        expect(labelElement.textContent).toBe(labelNames[index])
      })
      inputElements.forEach((inputElement, index) => {
        expect(inputElement.type).toBe(inputTypes[index])
      })
    })

    it('There is sign up button with correct text', () => {
      expect(page.getByRole('button', { name: 'Register' })).toHaveTextContent('Register')
    })
  })

  describe('network call', () => {
    jest.mock('react-router-dom')
    beforeEach(() => {
      const { useNavigate } = require('react-router-dom')
      useNavigate.mockImplementation(() => () => {})
    })

    it('When the register button is pressed, post register request send', async () => {
      const SignUp = require('./SignUp').default
      const page = render(<SignUp />)
      const spy = jest.spyOn(HttpClient, 'post')

      await waitFor(() => {
        fireEvent.click(page.getByRole('button', { name: 'Register' }))
      })

      expect(spy).toHaveBeenCalled()
    })

    it('When the register button is pressed, email/password/nickname send to post', () => {
      const SignUp = require('./SignUp').default
      const page = render(<SignUp />)
      const spy = jest.spyOn(HttpClient, 'post')
      const emailInputElement = page.getByLabelText('email')
      const passwordInputElement = page.getByLabelText('password')
      const nicknameInputElement = page.getByLabelText('nickname')
      const buttonElement = page.getByRole('button', { name: 'Register' })

      fireEvent.change(emailInputElement, { target: { value: 'email@gmail.com' } })
      fireEvent.change(passwordInputElement, { target: { value: 'somePassword' } })
      fireEvent.change(nicknameInputElement, { target: { value: 'someNickname' } })
      fireEvent.click(buttonElement)

      expect(spy).toHaveBeenCalledWith('/signup', {
        email: 'email@gmail.com',
        nickname: 'someNickname',
        password: 'somePassword',
      })
    })
  })

  it('When the register button is pressed, move to sign in page', async () => {
    jest.mock('react-router-dom')
    const { MemoryRouter } = jest.requireActual('react-router-dom')
    const { useNavigate } = require('react-router-dom')
    const mockedNavigate = jest.fn()
    useNavigate.mockImplementation(() => mockedNavigate)
    const Signup = require('./Signup').default
    const app = render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    )

    fireEvent.click(app.getByRole('button', { name: 'Register' }))

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'))
  })
})
