const SignUp = () => {
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
            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <div>Sign up</div>
                <label>email</label>
                <input type='email'/>
                <label>password</label>
                <input type='password'/>
                <label>nickname</label>
                <input type='text'/>
                <br/>
                <button>Register</button>
            </form>
        </div>
    )
}

export default SignUp