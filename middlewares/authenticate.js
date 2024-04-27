const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
}
token = token.replace('Bearer ', '');  // Remove Bearer from the token

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
      // Attach the user ID to the request object
    next();
});
};
const isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }
};
module.exports={
  authenticate,
  isAdmin}
