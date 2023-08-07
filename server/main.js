const jwt = require('jsonwebtoken')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = 4000
const secretKey = 'mysecretkey'
const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'user2', password: 'password2', role: 'user' },
    { id: 3, username: 'user3', password: 'password3', role: 'admin' },
]

const generateSessionToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, secretKey)
}

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find((item) => item.username == username)
    if (!user) {
        return res.json({ invalidUser: true })
    }
    if (user.password !== password) {
        return res.json({ invalidPassword: true })
    }

    const jwtSessionToken = generateSessionToken(user.id, user.role)
    return res.json({ jwtSessionToken })
})

app.listen(port, () => {
    console.log('app is running on the port 4000')
})
