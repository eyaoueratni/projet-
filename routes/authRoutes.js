const express = require('express');
const { registerController ,loginController, logoutController } = require('../controller/authController.js');
//router
const router = express.Router();
const {authenticate}=require('../middlewares/authenticate.js')
//REGISTER || GET
router.get("/register", (req, res) => {
  res.render("register");
});
// Route for user registration
router.post('/register',registerController);

//LOGIN || GET
router.get("/login", (req, res) => {
    res.render("login");
  });
// Route for user login
router.post("/login",loginController);

// Route for user logout
router.get("/logout",authenticate, logoutController);  

module.exports=router;