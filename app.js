//imports 
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db.js');
// dot env config
dotenv.config({ path: '' });
//rest object 
const app = express();
//connect mongo
connectDB();
//routes 
app.get('/', (req, res) => {
    res.send("<h1>welcome to meet rooms </h1>");
})
//port 

const PORT = process.env.PORT || 9010;
//listen 
app.listen(PORT, () => {
    console.log(` node server running in ${process.env.DEV_MODE} MODE on PORT no ${PORT} `.bgCyan.white);
})