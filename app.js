//import
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//app
const app = express()


//body-parser
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended:false})

//morgan
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use((req,res,next) =>{
    // res.status(200).json({
    //     message: "Hello World!!"
    // })
    next()
})

var user = [
    {
        "email" : "user1@admin.com",
        "name" : "user1",
        "password" : "123",
        "type" : 2,
    },{
        "email" : "user2@admin.com",
        "name" : "user2",
        "password" : "123",
        "type" : 2,
    },{
        "email" : "admin1@admin.com",
        "name" : "admin1",
        "password" : "123",
        "type" : 1,
    },{
        "email" : "admin2@admin.com",
        "name" : "admin2",
        "password" : "123",
        "type" : 1,
    }
]

// get User
app.get("/user",(req,res)=>{
    console.log("req", req.body)
    res.send({
        user
    })
})

//edit User
app.post("/edit/:email",jsonParser, (req,res) => {
    const email = req.params.email
    const param = req.body
    for (let i = 0; i < user.length; i++) {
        let thisuser = user[i]
        if (thisuser.email === email) {
            user[i] = param;
        }
    }

    res.send({
        massage : `Edited User : ${req.params.email}!`
    })
})

//delete User
app.post("/delete/:email",jsonParser, (req,res) => {
    const email = req.params.email
    user = user.filter(i => {
        if (i.email !== email) {
            return true;
        }
        return false;
    });

    res.send({
        massage : `Deleted User : ${req.params.email}!`
    })
})

//register user
app.post("/register", jsonParser, (req, res)=>{
    console.log("req", req.body)
    user.push(req.body)
    res.send({
        message: "POST Success"
    })
})

app.use(express.static("public"))
 module.exports = app