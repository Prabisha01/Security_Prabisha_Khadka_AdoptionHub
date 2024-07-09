// importing
const path = require("path");
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');
const multiparty = require('connect-multiparty')
const cloudinary = require('cloudinary');
const app = express();


// dotenv config
dotenv.config();

// cors policy
const corsPolicy = {
    origin : true,
    credentials : true,
    optionSuccessStatus : 200,   
}

app.use(cors(corsPolicy))

// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());

// multiparty middleware
app.use(multiparty())

//  HELLO Route 
// PATH: /hello
app.get('/hello',(req,res) => {
    res.send("Welcome to HELLO API start..")
})

// cloudinary config
          
cloudinary.config({
    cloud_name: process.env.ClOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// test route
app.get('/test',(req,res)=>{
    res.send('Hello from express server')
})
// http://localhost:5000/test

// user routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/product', require('./routes/productRoute'))
app.use('/api/order', require('./routes/orderRoute'))
app.use('/api/application', require('./routes/appplicationRoute'))
// our actual routes
// http://localhost:5000/api/user/create
// http://localhost:5000/api/user/login


// defining port
const PORT = process.env.PORT;


// run the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})


module.exports = {
    connectDB,
  };

module.exports = app;
