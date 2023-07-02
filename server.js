const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()

//Middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "client", "build")))

//ROUTES
    //1.Endpoint 2.Callback function
app.use("/menu", require("./routes/menuRoute"))


//Connect to Database
mongoose.connect(mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }), () => console.log("connected to database"))


//     //Middleware and Next
// app.use("/home", (req, res, next) => {
//     console.log("Home Route")
//     next()
// })

// app.get("/home", (req, res, next) => {
//     console.log("get req received")
//     res.send("Home Page")
// })

    //Error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

    //Server
//1.Port 2.Callback function
app.listen(process.env.PORT || 8000, () => {
console.log("server running on port 9000")
})
       









