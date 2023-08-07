import { useState } from 'react'
import '../styles/Login.scss'
import { useNavigate } from 'react-router'

export default function Login({ onLogin }) {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        const data = await response.json()
        if (data.jwtSessionToken) {
            onLogin(data.jwtSessionToken)
            navigate('/')
        }
    }

    

    return (
        <div className="login-page p-3">
            <h3>Login page</h3>

            <form className="login-form w-50 m-auto p-3 border border-2 rounded">
                <label htmlFor="username">Username</label>
                <input
                    className="form-control mt-2 mb-2"
                    id="username"
                    value={username}
                    onChange={handleUserName}
                    type="text"
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    className="form-control mt-2 mb-2"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    type="password"
                ></input>
                <input className="form-control mt-2 mb-2" id="username" type="submit" onClick={handleSubmit}></input>
            </form>
        </div>
    )
}
