import TextElement from '../utils/TextElement'
import '../styles/Home.scss'
import HeadingElement from '../utils/HeadingElement'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Home({ adminAccess }) {
    const navigate = useNavigate()

    const handleShakeClick = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        } else {
            navigate('/shakes')
        }
    }

    const handleAdminClick = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        } else {
            navigate('/admin')
        }
    }

    return (
        <div className="home-page p-3">
            <HeadingElement>Availables Shakes</HeadingElement>
            <TextElement>
                Please find the available shake{' '}
                <a className="click-here" onClick={handleShakeClick}>
                    here
                </a>
            </TextElement>
            <TextElement>
                For admin portal click{' '}
                <a className="click-here" onClick={handleAdminClick}>
                    here
                </a>
            </TextElement>
        </div>
    )
}
