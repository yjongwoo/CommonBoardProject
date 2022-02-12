import { fireEvent, prettyDOM, render, waitFor } from '@testing-library/react'
import SignIn from './SignIn'
import * as HttpClient from './HttpClient'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('Sign in page component', () => {
  beforeEach(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => () => {},
    }))
  })

  it('There are "Sign in" related components in SignIn page', () => {
    const page = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    )
    const emailInputElement = page.getByLabelText('Email')
    const passwordInputElement = page.getByLabelText('Password')

    expect(page.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
    expect(page.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
    expect(emailInputElement).toBeInTheDocument()
    expect(passwordInputElement).toBeInTheDocument()
    expect(emailInputElement.type).toBe('text')
    expect(passwordInputElement.type).toBe('password')
  })

  it('When Sign in button clicked, get request send with email, password', async () => {
    const spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})
    const page = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    )

    fireEvent.change(page.getByLabelText('Email'), { target: { value: 'email@gmail.com' } })
    fireEvent.change(page.getByLabelText('Password'), { target: { value: 'somePassword1!' } })
    fireEvent.click(page.getByRole('button', { name: 'Sign in' }))

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('/signin', { email: 'email@gmail.com', password: 'somePassword1!' })
    })
  })

  it('When email is not email format, fail to sign in', () => {
    const page = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    )
    const spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})

    fireEvent.change(page.getByLabelText('Email'), { target: { value: 'email' } })
    fireEvent.change(page.getByLabelText('Password'), { target: { value: 'somePassword' } })
    fireEvent.click(page.getByRole('button', { name: 'Sign in' }))

    expect(spy).not.toHaveBeenCalled()
    expect(page.getByText('Invalid email format')).toBeInTheDocument()
  })

  describe('password format', () => {
    let page, spy
    beforeEach(() => {
      spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})
      page = render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      )

      fireEvent.change(page.getByLabelText('Email'), { target: { value: 'email@gmail.com' } })
    })

    it('Too short, no special character, no uppercase character, no number', () => {
      fireEvent.change(page.getByLabelText('Password'), { target: { value: 'aaaa' } })
      fireEvent.click(page.getByRole('button', { name: 'Sign in' }))

      expect(spy).not.toHaveBeenCalled()
      expect(page.getByText('Invalid password format')).toBeInTheDocument()
    })

    it('No special character, no uppercase character', () => {
      fireEvent.change(page.getByLabelText('Password'), { target: { value: 'aabbcc22' } })
      fireEvent.click(page.getByRole('button', { name: 'Sign in' }))

      expect(spy).not.toHaveBeenCalled()
      expect(page.getByText('Invalid password format')).toBeInTheDocument()
    })
  })

  it('When sign in success, route to board page', async () => {
    jest.restoreAllMocks()
    const spy = jest.spyOn(HttpClient, 'post').mockResolvedValue({})
    const app = render(
      <MemoryRouter initialEntries={[{ pathname: '/signin' }]}>
        <App />
      </MemoryRouter>
    )

    fireEvent.change(app.getByLabelText('Email'), { target: { value: 'email@gmail.com' } })
    fireEvent.change(app.getByLabelText('Password'), { target: { value: 'aabbA1!s' } })
    fireEvent.click(app.getByRole('button', { name: 'Sign in' }))

    expect(spy).toHaveBeenCalled()
    await waitFor(() => {
      expect(app.getByText('자유게시판')).toBeInTheDocument()
    })
  })
})
