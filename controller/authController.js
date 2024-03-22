const userModel = require("../models/user.js");

const registerController = async (req, res, next) => {

    const { name, email, password } = req.body;
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
    //token 
    const token = user.createJwt()
    res.status(201).send({
        sucess: true,
        message: 'User created successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        },
        token,
    });

};
const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
        next('please provide all fields')
    }
    //find user by email
    const user = await userModel.findOne({ email })
    if (!user) {
        next('invalid username or password')
    }
    //compare password 
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid username or password')
    }
    const token = user.createJwt();
    res.status(200).json({
        success: true,
        messsage: "login successfully",
        user,
        token,
    });
};
module.exports = {
    loginController,
    registerController
};
