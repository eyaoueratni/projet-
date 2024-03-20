const userModel = require("../models/userModel.js");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //validate
        if (!name) {
            return res.status(400).send({ success: false, message: 'please provide name' })
        }
        if (!email) {
            return res.status(400).send({ success: false, message: 'please provide email' })
        }
        if (!password) {
            return res.status(400).send({ success: false, message: 'please provide password' })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'email already exist please login'
            });
        }
        const user = await userModel.create({ name, email, password });
        res.status(201).send({
            sucess: true,
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: 'error in register Controller',
            success: false,
            error
        })
    }
};
module.exports = registerController