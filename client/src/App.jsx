import About from './components/About'
import Home from './components/Home'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Shakes from './components/Shakes'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import Admin from './components/Admin'

function App() {
    const [sessionToken, setSessionToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [sessionExpired, setSessionExpired] = useState(false)

    const handleUserLogin = (jwtSessionToken, jwtRefreshToken) => {
        setSessionToken(jwtSessionToken)
        setRefreshToken(jwtRefreshToken)
        localStorage.setItem('sessionToken', jwtSessionToken)
        localStorage.setItem('refreshToken', jwtRefreshToken)
    }

    const handleUserLogout = () => {
        setSessionToken('')
        setRefreshToken('')
        localStorage.removeItem('sessionToken')
        localStorage.removeItem('refreshToken')
    }

    useEffect(() => {
        const fetchRefreshToken = async () => {
            const storedRefreshToken = localStorage.getItem('refreshToken')
            if (storedRefreshToken) {
                try {
                    const response = await fetch('http://localhost:4000/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken: storedRefreshToken }),
                    })
                    const { jwtSessionToken } = await response.json()
                    if (jwtSessionToken) {
                        setSessionToken(jwtSessionToken)
                        setSessionExpired(false)
                        localStorage.setItem('sessionToken', jwtSessionToken)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }
        if (!sessionToken) {
            fetchRefreshToken()
        }
    }, [sessionToken, sessionExpired])

    return (
        <div className="app">
            <Nav sessionToken={sessionToken} onLogout={handleUserLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
                <Route path="/about" element={<About />} />
                <Route path="/shakes" element={<Shakes />} />
                <Route
                    path="/admin"
                    element={<Admin sessionExpired={sessionExpired} setSessionExpired={setSessionExpired} />}
                />
            </Routes>
        </div>
    )
}

export default App
