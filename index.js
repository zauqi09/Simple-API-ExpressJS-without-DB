const fs = require("fs")
const http = require("http")
const url = require("url")
const app = require("./app")
const hostname = "127.0.0.1"
const port = 3010

const server = http.createServer(app)
// const server = http.createServer((req,res) => {
//     switch(req.url){
//     case '/admin':
//         res.statusCode = 200
//         res.setHeader("Content-Type", "text/plain")
//         res.end("Hello Admin!")
//     break;
//     case '/file':
//         fs.readFile("./test.txt",(err,data)=>{
//             if(err){
//                 res.statusCode = 500
//                 res.setHeader("Content-Type", "text/plain")
//                 res.end("Error!")
//             }else{
//                 res.statusCode = 200
//                 res.setHeader("Content-Type", "text/plain")
//                 res.end(data)
//             }
//         })
       
//     break;
//     case '/gambar':
//         fs.readFile("./image/Huang.jpg",(err,data)=>{
//             if(err){
//                 res.statusCode = 500
//                 res.setHeader("Content-Type", "text/plain")
//                 res.end("Error!")
//             }else{
//                 res.statusCode = 200
//                 res.setHeader("Content-Type", "image/jpeg")
//                 res.end(data)
//             }
//         })
       
//     break;
//     default:
//         res.statusCode = 200
//         res.setHeader("Content-Type", "text/plain")
//         res.end("Hello World!")
//     break;
//     }
// })
    

server.listen(port,hostname, () => {console.log("Server Listen on Port" + port);})