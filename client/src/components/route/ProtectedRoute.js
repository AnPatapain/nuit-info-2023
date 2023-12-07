import React from 'react'
import appConfig from 'configs/app.config'
import { useSelector } from 'react-redux'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {
    const { authenticated } = useAuth()
    const profile = useSelector((state) => state.profile)
    const location = useLocation()

    if (!authenticated) {
        return (
            <Navigate
                to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
                replace
            />
        )
    }
    const onProfilePage = location.pathname === '/profile';

    if (authenticated && !profile._id && !onProfilePage) {
        return <Navigate to="/profile" replace />;
    }
    return <Outlet />
}

export default ProtectedRoute   
