const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate=require('../middlewares/authenticate.js')
const registerController = async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;
      // Check if user with the same email exists
      const existingUser = await userModel.findOne({ email:req.body.email}); // Corrected from User to userModel
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user with client role
      const newUser = new userModel({
        name,
        lastName,
        email,
        password: hashedPassword,
        role: 'user'
      });
      await newUser.save();
      // Redirect user to the login page after successful registration
      res.redirect('/login');
    } catch (error) {
      console.error("Error in registerController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
// Controller for user login
const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      const apiMode = req.query.api;  // Check if API mode is enabled
  
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token with user role included in the payload
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Attach user information and token to the response
      const userResponse = {
        _id: user._id,
        role: user.role,
        token: token  // Including token in the JSON response
      };
  
      if (apiMode === 'true') {
        return res.json(userResponse);  // Return JSON if API mode is enabled
      }
  
      // For regular web requests, continue with rendering views
      res.cookie('jwt', token, { httpOnly: true });
      if (user.email === 'admin@gmail.com') {
        res.render('admin/main', { user: req.user, token });
      } else {
        res.render('home', { user: req.user, token });
      }
    } catch (error) {
      console.error("Error in loginController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  
  
  // Controller for user logout
  const logoutController = async (req, res) => {
    try {
      // Clearing the JWT cookie
      res.cookie('jwt', '', { expires: new Date(0) });  // Set the cookie to expire immediately
  
      // Redirect to home page after logout
      res.redirect('/');  // Assuming '/' route is set to render your index.ejs
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports = {
    registerController,
    loginController,
    logoutController,
};
