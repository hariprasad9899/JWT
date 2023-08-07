import { useState } from 'react'
import '../styles/Login.scss'

export default function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
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
