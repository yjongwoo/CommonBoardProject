import React, { useState } from 'react'
import * as HttpClient from './HttpClient'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warning, setWarning] = useState('')
  const navigate = useNavigate()

  const onEmailChange = ({ target: { value } }) => setEmail(value)

  const onPasswordChange = ({ target: { value } }) => setPassword(value)

  const onClick = (event) => {
    event.preventDefault()

    const atIndex = email.indexOf('@')
    const dotIndex = email.indexOf('.')
    if (atIndex === -1 || dotIndex === -1 || atIndex > dotIndex) {
      setWarning('Invalid email format')
      return
    }
    if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
      setWarning('Invalid password format')
      return
    }

    HttpClient.post('/signin', { email, password }).then(() => {
      navigate('/board')
    })
  }

  const onClickSignUp = () => {
    navigate('/signup')
  }

  return (
    <div>
      <h1>Sign in</h1>
      <label htmlFor="email">Email</label>
      <input id="email" type="text" onChange={onEmailChange} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" onChange={onPasswordChange} />

      <div>{warning}</div>
      <button type="submit" onClick={onClick}>
        Sign in
      </button>
      <button type="submit" onClick={onClickSignUp}>
        Sign up
      </button>
    </div>
  )
}

export default SignIn
