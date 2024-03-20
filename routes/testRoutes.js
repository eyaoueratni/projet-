const express = require('express');
const testController = require('../controller/testController.js')
//router Object
const router = express.Router();
//routes
router.post('/test-post', testContoller)
//export
module.exports = testController;