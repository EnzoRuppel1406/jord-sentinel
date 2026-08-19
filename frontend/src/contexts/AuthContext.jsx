import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkAuthentication = async () => {
        try {
            const response = await api.get('/users/me')

            setUser(response.data)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuthentication()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
}
