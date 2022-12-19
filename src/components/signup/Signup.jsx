import React, { useState } from 'react'
import { ROLES } from "../../constants/userRoles"

import { Dropdown, DropdownButton } from 'react-bootstrap'
import "./signup.css"


const Signup = (props) => {
    const { onSignupSubmit, goToLogin, errorMessageSignup } = props;

    const [userId, steUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userName, steUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState(ROLES.CUSTOMER);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        // create the data object 
        // call the handleSignupSubmit with data 

        const data = { userId, password, name: userName, email, userType };
        onSignupSubmit(data);
        e.preventDefault();
    }




    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className='bg-white auth-container p-5'>
                <h1>REGISTER</h1>
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
                            className='form-control m-1'
                            type="text"
                            placeholder='Enter User Name'
                            value={userName}
                            onChange={e => {
                                steUserName(e.target.value)
                            }}
                        />
                    </div>
                    <div className='input-group'>
                        <input
                            className='form-control m-1'
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className='col d-flex justify-content-center align-items-center'>
                        <label>User Type: </label>
                        <DropdownButton
                            align='end'
                            title={userType}
                            id='userType'
                            className='form-control m-1'
                            onSelect={val => {
                                setUserType(val);
                            }}
                            variant='light'
                        >
                            <Dropdown.Item eventKey={ROLES.CUSTOMER}>
                                {ROLES.CUSTOMER}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey={ROLES.CLIENT}>
                                {ROLES.CLIENT}
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className='input-group'>
                        <input
                            className='form-control m-1 btn btn-primary'
                            type="submit"
                            value='SignUp' />
                    </div>
                    <div className='my-2'>
                        Already have an Account ? <a href="#" onClick={goToLogin}>LogIn !</a>
                    </div>
                    <div className='error-msg text-danger m-1'>{errorMessageSignup}</div>
                </form>
            </div>

        </div>
    )
}

export default Signup