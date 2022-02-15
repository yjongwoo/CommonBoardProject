import { useState } from 'react'
import * as HttpClient from './HttpClient'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const onEmailHandler = ({ currentTarget: { value } }) => setEmail(value)
  const onPasswordHandler = ({ currentTarget: { value } }) => setPassword(value)
  const onNicknameHandler = ({ currentTarget: { value } }) => setNickname(value)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    HttpClient.post('/signup', {
      email,
      password,
      nickname,
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <div>
      <form>
        <p>Sign up</p>
        <label htmlFor="email">email</label>
        <input id="email" type="email" onChange={onEmailHandler} />
        <label htmlFor="password">password</label>
        <input id="password" type="password" onChange={onPasswordHandler} />
        <label htmlFor="nickname">nickname</label>
        <input id="nickname" type="text" onChange={onNicknameHandler} />
        <br />
        <button onClick={onSubmitHandler}>Register</button>
      </form>
    </div>
  )
}

export default SignUp
