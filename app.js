//imports 
const express = require('express');
//rest object 
const app = express();


//routes 
app.get('/', (req, res) => {
    res.send("<h1>welcome to meet rooms  </h1>");
})
//listen 
app.listen(8000, () => {
    console.log(" node  server running on 8000");
})