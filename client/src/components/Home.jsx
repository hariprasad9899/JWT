import TextElement from '../utils/TextElement'
import '../styles/Home.scss'
import HeadingElement from '../utils/HeadingElement'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    const handleClick = () => {
        const token = localStorage.getItem('token')
        console.log(token)
        if (!token) {
            navigate('/login')
        } else {
            navigate('/shakes')
        }
    }

    return (
        <div className="home-page p-3">
            <HeadingElement>Availables Shakes</HeadingElement>
            <TextElement>
                Please find the available shake{' '}
                <a className="click-here" onClick={handleClick}>
                    here
                </a>
            </TextElement>
        </div>
    )
}
