// check userName and Password in post (login) request
// If exist create new JWT
// send back to font-end

// setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken')
const CustomApiError = require('../errors/custom-error')

const login = async (req, res) => {
    const { userName, password } = req.body
    if(!userName || !password ){
        throw new CustomApiError(`Please provide email and password`,400)
    }
    // just for demo, normally provided by DB!!!
    const id = new Date().getDate()
    
    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!
    const token = jwt.sign({id, userName}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, Roman Shahrear`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}