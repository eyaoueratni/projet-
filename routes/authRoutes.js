const express = require('express');
const registerController = require('../controller/authController.js');

//router
const router = express.Router();
//routes
router.post('/register', registerController)

//export
module.exports = router;