const userModel = require("../models/userModel.js");

const registerController = async (req, res, next) => {

    const { name, email, password } = req.body
    //validate
    if (!name) {
        next('name is required !');
    }
    if (!email) {
        next('email is required !');
    }
    if (!password) {
        next('password is required !');
    }
    /*const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        next('email already exist ,please login');
    };*/
    const user = await userModel.create({ name, email, password });
    res.status(201).send({
        sucess: true,
        message: 'User created successfully',
        user,
    });

};
module.exports = registerController