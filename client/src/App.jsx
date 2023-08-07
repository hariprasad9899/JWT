import About from './components/About'
import Home from './components/Home'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Shakes from './components/Shakes'
import Login from './components/Login'

function App() {
    return (
        <div className="app">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/shakes" element={<Shakes />} />
            </Routes>
        </div>
    )
}

export default App
