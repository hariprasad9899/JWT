import TextElement from '../utils/TextElement'
import HeadingElement from '../utils/HeadingElement'
import '../styles/Nav.scss'
import { useNavigate } from 'react-router-dom'

export default function Nav({ token, onLogin }) {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleLogoutClick = () => {
        onLogin('')
        navigate('/')
    }

    return (
        <div className="nav p-3">
            <div className="heading-section">
                <HeadingElement>Thick Shake Factory</HeadingElement>
            </div>
            <div className="login-section">
                {!token ? (
                    <button className="btn btn-primary" onClick={handleLoginClick}>
                        Login
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={handleLogoutClick}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    )
}
