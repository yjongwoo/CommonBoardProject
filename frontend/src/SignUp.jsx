import {useState} from "react";
import * as HttpClient from "./HttpClient";
import {useNavigate} from "react-router";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const navigate = useNavigate()
    // console.log(navigate())

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        HttpClient.post('/signup',
            {
                email: email,
                password: password,
                nickname: nickname
            }).then(() => navigate('/'))
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <form data-testid='signup-form' style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Sign up</p>
                <label htmlFor='email'>email</label>
                <input id='email' type='email' value={email} onChange={onEmailHandler}/>
                <label htmlFor='password'>password</label>
                <input id='password' type='password' value={password} onChange={onPasswordHandler}/>
                <label htmlFor='nickname'>nickname</label>
                <input id = 'nickname' type='text' value={nickname} onChange={onNicknameHandler}/>
                <br/>
                <button type='submit'
                        onClick={onSubmitHandler}
                >Register</button>
            </form>
        </div>
    )
}

export default SignUp