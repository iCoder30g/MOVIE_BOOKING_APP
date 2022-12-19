import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CButton } from '@coreui/react';

import "./header.css"


const Header = (props) => {
    const {filterMoviesBySearch, showSearch} =props;

    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const logoutFn = () => {
        localStorage.clear();
        navigate("/login");
    };

    const loginFn = () => {
        navigate("/login")
    }

    const searchFn = (e) => {
        console.log(searchText)
        e.preventDefault();
        filterMoviesBySearch(searchText);
    }


    const isUserLoggedIn = localStorage.getItem("accessToken");


    return (
        <div className='bg-dark p-4 d-flex justify-content-between'>
            <div>
                <a className="display-6 text-danger py-1 remove-underline" href='#' onClick={() => {
                    navigate("/")
                }}>Movie Booking App</a>
            </div>


            {showSearch && (
                <form className="d-flex" onSubmit={searchFn}>
                <input
                    type="text"
                    className='custom-input'
                    value={searchText}
                    placeholder={"Enter The Movie Name"}
                    onChange={e => {
                        setSearchText(e.target.value);
                    }}
                />
                <CButton
                    type="submit"
                    color="danger"
                    className="px-3 searcgBtn"
                >
                    SEARCH</CButton>
            </form>
            )}
            


            {isUserLoggedIn ? (
                <CButton
                    type="submit"
                    color="danger"
                    className="px-3"
                    onClick={logoutFn}
                >
                    LOGOUT</CButton>
            ) : (
                <CButton
                    type="submit"
                    color="danger"
                    className="px-3"
                    onClick={loginFn}
                >
                    LOGIN</CButton>
            )}
        </div>

    )
}

export default Header