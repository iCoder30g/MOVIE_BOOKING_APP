import React, { useState } from 'react'

import "./login.css"


const Login = (props) => {
    const { onLoginSubmit, goToSignup, loginMessage, errorMessageLogin } = props

    const [userId, steUserId] = useState("")
    const [password, setPassword] = useState("")
    

    const handleSubmit = (e) => {
        // create the data object 
        // call the handleLoginSubmit with data 

        const data = { userId, password };
        onLoginSubmit(data);
        e.preventDefault();
    }




    return (
        <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div className='auth-container bg-white p-5'>
                <h1 >LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <input
                            className='form-control m-1'
                            type="text"
                            placeholder='Enter UserId'
                            value={userId}
                            onChange={e => {
                                steUserId(e.target.value)
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            className='form-control m-1'
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            className='form-control m-1 btn btn-primary'
                            type="submit"
                            value='LogIn' />
                    </div>
                    <div className='my-2'>
                        Don't have an Account ? <a href="#" onClick={goToSignup}>SignUp !</a>
                    </div>
                </form>
                <div className='error-msg text-danger m-1'>{errorMessageLogin}</div>
                <div className='error-msg text-success m-1'>{loginMessage}</div>
            </div>

        </div>
    )
}

export default Login