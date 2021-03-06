import React, {useEffect, useState} from 'react'
import * as HttpClient from './HttpClient'
import { useNavigate } from 'react-router-dom'
import useAxios from "./useAxios";

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
    const dotIndex = email.lastIndexOf('.')
    if (atIndex === -1 || dotIndex === -1 || atIndex > dotIndex) {
      setWarning('Invalid email format')
      return
    }
    if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
      setWarning('Invalid password format')
      return
    }

    // HttpClient.post('/signin', { email, password }).then(() => {
    //   navigate('/board')
    // })

      const { response, loading, error } = useAxios({
          method: 'post',
          url: '/posts',
          headers: JSON.stringify({ accept: '*/*' }),
          body: JSON.stringify({
              userId: 1,
              id: 19392,
              title: 'title',
              body: 'Sample text',
          }),
      });
      const [data, setData] = useState([]);

      useEffect(() => {
          if (response !== null) {
              setData(response);
          }
      }, [response]);
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
