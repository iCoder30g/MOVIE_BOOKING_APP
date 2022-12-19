import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Login from '../../components/login/Login'
import Signup from '../../components/signup/Signup'
import { storeUserData } from '../../utils/userData'
import { userSignin } from '../../api/auth'
import { newUserSignup } from '../../api/auth'
import { ROLES } from "../../constants/userRoles"

import "./authentication.css"



const Authentication = () => {
    const [showSignup, setShowSignup] = useState(false)
    const [loginMessage, setLoginMessage] = useState("")
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    const [errorMessageSignup, setErrorMessageSignup] = useState("");

    const navigate = useNavigate();


    const goToSignup = () => {
        setShowSignup(true)
    }

    const goToLogin = () => {
        setShowSignup(false)
    }


    useEffect(() => {
        if(localStorage.getItem("accessToken")) {
            const userType = localStorage.getItem("userTypes");
            redirectToPage(userType);
        }
    }, []);


    const redirectToPage = (userType) => {
        if (userType === ROLES.CUSTOMER) {
            navigate("/customer");
        } else if (userType === ROLES.CLIENT) {
            navigate("/client");
        } else {
            navigate("/admin");
        }
    }


    const handleLoginSubmit = (data) => {
        console.log(data)
        // make aPI call and post data 
        userSignin(data)
            .then(res => {
                console.log(res);
                const { status, message, data } = res;
                if (status === 200) {
                    if (message) {
                        // case when login credentials are incorrect
                        setErrorMessageLogin(message)
                    } else {
                        // if API call is successsful, store teh data in localStorage
                        storeUserData(data);
                        // navigate to the correct page based on userType
                        const userType = data.userTypes;
                        redirectToPage(userType);
                    }
                }
            })
            .catch(err => {
                // case when API fails due to network / Authrntication issue
                setErrorMessageLogin(err?.response?.data?.message || err?.message);
            });
    }


    const handleSignupSubmit = (data) => {
        console.log(data);
        // make aPI call and post data to signup
        newUserSignup(data)
            .then(res => {
                const { message, status } = res;
                // if API call is successsful, redirect to login page 
                if (status === 201) {
                    setShowSignup(false);
                    // if API call is successful, show a message to user
                    setLoginMessage("SignUp Successful!! Please Login")
                } else if (message) {
                    setErrorMessageSignup(message);
                }
            })
            // if submit is failure, dont redirect to next page
            .catch(err => {
                setErrorMessageSignup(err?.response?.data?.message || err?.message);
            });
    }


  

    return (
        <div className='main'>

            {showSignup && (
                <Signup
                    onSignupSubmit={handleSignupSubmit}
                    goToLogin={goToLogin}
                    errorMessageSignup={errorMessageSignup}
                />
            )}

            {!showSignup && (
                <Login
                    onLoginSubmit={handleLoginSubmit}
                    goToSignup={goToSignup}
                    loginMessage={loginMessage}
                    errorMessageLogin={errorMessageLogin}
                />
            )}


        </div>
    )
}

export default Authentication