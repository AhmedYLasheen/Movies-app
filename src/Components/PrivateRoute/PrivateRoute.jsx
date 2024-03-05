import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export default function PrivateRoute(logingData) {
    return (
        <>         
            {logingData ? <Outlet/> : <Navigate to="/login" />}
        </>
    )
}
