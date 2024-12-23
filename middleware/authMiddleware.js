const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from the request header (assuming it's passed as "Authorization: Bearer <token>")
  const token = req.header("Authorization")?.replace("Bearer ", "")||req.body.token;    

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing",
    });
  }

  try {
    // Verify token with the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
