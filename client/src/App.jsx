import About from './components/About'
import Home from './components/Home'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Shakes from './components/Shakes'
import Login from './components/Login'
import { useState } from 'react'
import Admin from './components/Admin'

function App() {
    const [token, setToken] = useState('')

    const handleUserLogin = (newToken) => {
        setToken(newToken)
        localStorage.setItem('token', newToken)
    }

    return (
        <div className="app">
            <Nav token={token} onLogin={handleUserLogin} />
            <Routes>
                <Route path="/" element={<Home token={token} />} />
                <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
                <Route path="/about" element={<About />} />
                <Route path="/shakes" element={<Shakes />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    )
}

export default App
