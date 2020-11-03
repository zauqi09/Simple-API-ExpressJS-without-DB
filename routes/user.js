const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
const key = process.env.JWT_KEY

const jwtAuth = require("../middleware/jwtAuth")
var user = require("../models/user")

// profile data
router.get("/:email", jwtAuth, (dataLogin, req, res, next) => {
    // login success
    const paramemail = req.params.email
    user.filter(user=> user.email===paramemail && dataLogin.email===paramemail).map(user=>{
        return response(res, 200, "Success", [user])
    }) 
    return response(res, 400, "Invalid Parameter!", [])
    

})

// private data
router.get("/", jwtAuth, (dataLogin, req, res, next) => {
    if (dataLogin.type === 1) {
        const token = jwt.sign({user}, key, { expiresIn: '1h' })
        return response(res, 200, "Success", [{token}])
    } else {
        return response(res, 400, "Unauthorized!!", [])
    }
})

// edit data
router.post("/edit/:email", jwtAuth, (dataLogin, req, res, next) => {
    const email = req.params.email
    const editedData = req.body
    if (dataLogin.type === 1) {
        for (let i = 0; i < user.length; i++) {
            if (user[i].email === email) {
                user[i] = editedData;
                return response(res, 200, "Edit Success", [user])
            }
        }
    } else if (dataLogin.type ===2) {
        if (dataLogin.email===email) {
            for (let i = 0; i < user.length; i++) {
                if (user[i].email===email) {
                    user[i] = editedData;
                    return response(res, 200, "Success", [user])
                }
            }
        }
    }
    return response(res, 400, "Unauthorized!!", [])
})

//delete data
router.post("/delete/:email", jwtAuth, (dataLogin, req, res, next) => {
    const email = req.params.email
    if (dataLogin.type === 1) {
        user = user.filter(i => i.email !== email) 
        return response(res, 200, "Success", [user])
    }
    return response(res, 400, "Unauthorized!!", [])
})

const response = (res, code, message, data) => {
    res.send({
        code,
        message,
        data
    })
}
module.exports = router