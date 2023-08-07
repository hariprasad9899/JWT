import TextElement from '../utils/TextElement'
import '../styles/Home.scss'
import HeadingElement from '../utils/HeadingElement'
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home-page p-3">
            <HeadingElement>Availables Shakes</HeadingElement>
            <TextElement>
                Please find the available shake <NavLink to="/login">here</NavLink>
            </TextElement>
        </div>
    )
}
