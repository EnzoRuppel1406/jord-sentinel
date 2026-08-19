import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user, loading, checkAuthentication } = useContext(AuthContext)
    const location = useLocation()

    useEffect(() => {
        checkAuthentication()
    }, [location.pathname])

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Carregando...</div>
    }

    if (!user) {
        return <Navigate to={'/login'} replace />
    }

    return children
}

export default ProtectedRoute
