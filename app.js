//import
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const users = require("./routes/user")
const auth = require("./routes/auth")

//app
const app = express()


//body-parser

//const urlencodedParser = bodyParser.urlencoded({extended:false})

//use
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// serve static files
app.use(express.static("public"))

app.use((req, res, next) => {
    // res.status(200).json({
    //     message: "Hello World!!"
    // })
    next()
})

app.use("/auth", auth)
app.use("/users", users) // edit, delete, detail, add, get

// error handler
app.use((req, res, next) => {
    const error = new Error("Error occured!!")
    next(error)
})
app.use((error, req, res, next) => {
    res.status(500).json({
        code: 500,
        message: error.message
    })
})

// // get User
// app.get("/user",(req,res)=>{
//     console.log("req", req.body)
//     res.send({
//         user
//     })
// })

// //edit User
// app.post("/edit/:email",jsonParser, (req,res) => {
//    const email = req.params.email
//     const param = req.body
//     for (let i = 0; i < user.length; i++) {
//         let thisuser = user[i]
//         if (thisuser.email === email) {
//             user[i] = param;
//             break
//         }
//     }

//     res.send({
//         massage : `Edited User : ${req.params.email}!`
//     })
// })

// //delete User
// app.post("/delete/:email",jsonParser, (req,res) => {
//     const email = req.params.email
//     user = user.filter(i => {
//         if (i.email !== email) {
//             return true;
//         }
//         return false;
//     });

//     res.send({
//         massage : `Deleted User : ${req.params.email}!`
//     })
// })



app.use(express.static("public"))
 module.exports = app