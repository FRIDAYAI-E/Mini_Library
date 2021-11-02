import React from 'react'
import { NavLink } from "react-router-dom";


function SuccessBooking() {
    return (
        <div>
            <h1>Success!</h1>
            <NavLink to={"/user/dashboard"} ><button>back to dashboard</button> </NavLink>
        </div>
    )
}

export default SuccessBooking
