//imports packages 
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const expresserror = require('express-async-errors');
//imports files
const connectDB = require('./config/db.js');
//routes imports
const testRoutes = require('./controller/testController.js');
const authRoutes = require('./routes/authRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
// dot env config
dotenv.config();
//rest object 
const app = express();
//connect mongo
connectDB();
//middlewares

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes 
app.use('/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
//validation middleware 
app.use(errorMiddleware);
//port 

const PORT = process.env.PORT || 9010;
//listen 
app.listen(PORT, () => {
    console.log(` node server running in ${process.env.DEV_MODE} MODE on PORT no ${PORT} `.bgCyan.white);
})