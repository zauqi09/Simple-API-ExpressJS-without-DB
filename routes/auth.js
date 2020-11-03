const express = require("express")
const bodyParser = require('body-parser')
const router = express.Router()
const jwt = require("jsonwebtoken")


const jsonParser = bodyParser.json()
const user = require("../models/user")
require("dotenv").config()

const key = process.env.JWT_KEY


router.post("/login", (req, res) => {
    const { email, password,type } = req.body
    user.filter(user=> email === user.email && password === user.password).map(user=>{
        const dataUser = {
            email: user.email,
            type: user.type
            }
            const token = jwt.sign(dataUser, key, { expiresIn: '1h' })

        return response(res, 200, "Login Success!", [{ dataUser,token }])
        }
    )
    return response(res, 401, "User does not exist!!", [])
})

//register user
router.post("/register", jsonParser, (req, res)=>{
    const { email, passwordConfirm, password } = req.body
    const checkEmail = user.find(user=> email === user.email)
    if (!checkEmail) {
        if(password === passwordConfirm){
            user.push(req.body)
            return response(res, 200, "Register Success!!", [{ email }])
        }
    }
    return response(res, 400, "Email has already registered or bad request!", [])
    
})

const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}

module.exports = router