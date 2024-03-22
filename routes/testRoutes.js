const express = require('express');
const testController = require('../controller/testController.js');
const authenticate = require('../middlewares/authenticate.js');
//router Object
const router = express.Router();
//routes
router.post('/test-post', authenticate, testContoller)
//export
module.exports = testController;