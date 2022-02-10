import {useState} from "react";
import * as HttpClient from "./HttpClient";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

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
            }).then(response => history.push('/'))
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
                <label>email</label>
                <input type='email' value={email} onChange={onEmailHandler}/>
                <label>password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                <label>nickname</label>
                <input type='text' value={nickname} onChange={onNicknameHandler}/>
                <br/>
                <button data-testid='signup-button'
                        type='submit'
                        onClick={(event) => onSubmitHandler(event)}
                >Register</button>
            </form>
        </div>
    )
}

export default SignUp