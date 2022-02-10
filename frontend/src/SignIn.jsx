import React, {useState} from "react";

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = (event) => {
        console.log('sign in button pressed')
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
            <form data-testid='signIn-form' style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Sign In</p>
                <label>email</label>
                <input type='email' value={email}/>
                <label>password</label>
                <input type='password' value={password}/>
                <br/>
                <button data-testid='signIn-button'
                        type='submit'
                >Sign in</button>
                <button data-testid='signup-button'
                >Sign up</button>
            </form>
        </div>
    )
}

export default SignIn