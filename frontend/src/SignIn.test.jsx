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

describe('Sign in page component', () => {
  it('render', () => {
    const page = renderSignIn()
    const emailInputElement = page.getByLabelText('Email')
    const passwordInputElement = page.getByLabelText('Password')

    expect(page.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
    expect(getSignInButton(page)).toBeInTheDocument()
    expect(emailInputElement).toBeInTheDocument()
    expect(passwordInputElement).toBeInTheDocument()
    expect(emailInputElement.type).toBe('text')
    expect(passwordInputElement.type).toBe('password')
  })

  describe('network call', () => {
    it('send get request on sign in button click', async () => {
      const { useNavigate } = require('react-router-dom')
      useNavigate.mockImplementation(() => () => {})
      const spy = httpPostSpy()
      const page = renderSignIn(true)
      const { email, password } = {
        email: 'email@gmail.com',
        password: 'somePassword1!',
      }

      changeInputTextByLabel(page, 'Email', email)
      changeInputTextByLabel(page, 'Password', password)
      clickSignInButton(page)

      await waitFor(() => expect(spy).toHaveBeenCalledWith('/signin', { email, password }))
    })
  })

  describe('input verification', () => {
    let spy, page
    beforeEach(() => {
      spy = httpPostSpy()
      page = renderSignIn()
    })
    it('invalid email format', () => {
      changeInputTextByLabel(page, 'Email', 'email')
      changeInputTextByLabel(page, 'Password', 'Password1!')
      clickSignInButton(page)

      expect(spy).not.toHaveBeenCalled()
      expectText(page, 'Invalid email format')
    })

    describe('invalid password format', () => {
      beforeEach(() => {
        changeInputTextByLabel(page, 'Email', 'email@gmail.com')
      })

      it('Too short, no special character, no uppercase character, no number', () => {
        changeInputTextByLabel(page, 'Password', 'aaaa')
        clickSignInButton(page)

        expect(spy).not.toHaveBeenCalled()
        expectText(page, 'Invalid password format')
      })

      it('No special character, no uppercase character', () => {
        changeInputTextByLabel(page, 'Password', 'aabbcc22')
        clickSignInButton(page)

        expect(spy).not.toHaveBeenCalled()
        expectText(page, 'Invalid password format')
      })
    })
  })

  it('move to board page on sign in', async () => {
    const { useNavigate } = require('react-router-dom')
    const mockedNavigate = jest.fn()
    useNavigate.mockImplementation(() => mockedNavigate)
    httpPostSpy()
    const page = renderSignIn(true)

    changeInputTextByLabel(page, 'Email', 'email@gmail.com')
    changeInputTextByLabel(page, 'Password', 'aabbA1!s')
    clickSignInButton(page)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/board'))
  })
})
const renderSignIn = (isWithRouter = false) => renderComponent('./SignIn', isWithRouter)
const getSignInButton = (page) => getButtonByText(page, 'Sign in')
const clickSignInButton = (page) => clickButtonWithText(page, 'Sign in')
