import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const protectedRoute = (handler) => async (req, res) => {
  try {
    // Extract the JWT token from the Authorization header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;

    // Perform additional checks if needed (e.g., user roles, permissions, etc.)

    // Call the original route handler with the userId
    return handler(req, res, userId);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default protectedRoute;
