import TextElement from '../utils/TextElement'
import HeadingElement from '../utils/HeadingElement'
import '../styles/Nav.scss'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate('/login')
    }

    return (
        <div className="nav p-3">
            <div className="heading-section">
                <HeadingElement>Thick Shake Factory</HeadingElement>
            </div>
            <div className="login-section">
                <button className="btn btn-primary" onClick={handleLoginClick}>
                    Login
                </button>
            </div>
        </div>
    )
}
