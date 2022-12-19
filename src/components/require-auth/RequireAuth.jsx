import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = (props) => {
    const {allowedRoles} = props;
    const userTypes = localStorage.getItem("userTypes");

    /**
     * If the current logged in userType exists allowed role array,
     * let the user move to the concerned page
     */
    if (allowedRoles.includes(userTypes)) {
        return <Outlet />;
    }

    /**
     * If the current logged in userType and the allowed role is different,
     * if the user is not logged in,  redirect to the login page
     */
    if (!userTypes) {
        return <Navigate to="/login" replace />
    }

  return <Navigate to="/unauthorised" replace />
}

export default RequireAuth