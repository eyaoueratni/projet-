//imports packages 
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs')
const path = require('path')
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

//imports files
const connectDB = require('./config/db.js');
//routes imports
const testRoutes = require('./controller/testController.js');
const authRoutes = require('./routes/authRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
const userRoutes=require('./routes/userRoutes.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
// dot env config
dotenv.config();
//rest object 
const app = express();
//connect mongo
connectDB();
//middlewares
// Middleware for HTTP verb overrides
app.use(methodOverride('_method'));
// Flash messages middleware setup
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));


// Use cookie-parser middleware
app.use(cookieParser());
//gestion de front
app.use(express.static(path.join(__dirname, 'assets')))
// Session configuration
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );

app.set("view engine", "ejs");
app.set("views", "views");

//routes 
app.use('/test', testRoutes);
app.use('/', authRoutes);
app.use('/', roomRoutes);
app.use('/', userRoutes);
app.get('/', (req, res, next) => {
    res.render('index')
})
/*app.get('/room', (req, res, next) => {
    res.render('rooms')
})
*/

//port 

const PORT = process.env.PORT || 9010;
//listen 
app.listen(PORT, () => {
    console.log(` node server running in ${process.env.DEV_MODE} MODE on PORT no ${PORT} `.bgCyan.white);
})