const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const secretKey = 'mysecretkey'
const port = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'admin', password: 'adminpass', role: 'admin' },
]

const generateSessionToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, secretKey, { expiresIn: '1m' })
}

const generateRefreshToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, secretKey, { expiresIn: '7d' })
}

const tokenExpirationInfo = (token) => {
    const expirationDate = new Date(token.exp * 1000) // Convert to milliseconds
    if (expirationDate <= new Date()) {
        return false
    } else {
        return true
    }
}

// intro
app.get('/', (req, res) => {
    res.send(`<h1>Server is running on port 4000</h1>`)
})

// login route
app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find((item) => item.username == username)
    if (!user) {
        return res.status(401).json({ error: 'no user found' })
    }
    const jwtSessionToken = generateSessionToken(user.id, user.role)
    const jwtRefreshToken = generateRefreshToken(user.id, user.role)
    return res.json({ jwtRefreshToken, jwtSessionToken })
})

// protected route
app.post('/protected', (req, res) => {
    const jwtBearerToken = req.headers.authorization
    const token = jwtBearerToken.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'You are not authorized' })
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        if (decoded.userRole !== 'admin') {
            return res.status(403).json({ message: 'Permission Denied' })
        }
        return res.json({ message: 'Access granted' })
    } catch (err) {
        let msg = err.message
        if (msg.toUpperCase().includes('EXPIRED')) {
            return res.status(403).json({ message: 'Token has expired' })
        }
        return res.status(401).json({ message: 'Invalid token' })
    }
})

app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body
    try {
        const decoded = jwt.verify(refreshToken, secretKey)
        const sessionToken = generateSessionToken(decoded.userId, decoded.userRole)
        return res.json({ sessionToken })
    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' })
    }
})

app.get('/set-cookie', (req, res) => {
    res.cookie('mycookie', 'hariprasad', { httpOnly: true, secure: true })
    res.json({ message: 'cookies are set' })
})

app.listen(port, () => {
    console.log(`Server is running on port 4000`)
})

// user1 - "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTY5MTM3NTc3Mn0.5cTmlqhCNUcTb1GRudREqjFByO-WJ39_HbaaVjp3TXQ"
// user2 - "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTEzNzU4NTZ9.8QAkkDL5Qq9fUQ_YDnWgfkYm5it3tNBhmHBc_12lGiY"
