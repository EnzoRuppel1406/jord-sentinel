import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import History from './pages/History'
import Admin from './pages/Admin'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="/history" element={<History />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
