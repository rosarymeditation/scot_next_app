import jwt from "jsonwebtoken";

const authenticate = (handler) => async (req, res) => {
  // Check if the request header includes the 'Authorization' header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Extract the token from the 'Authorization' header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, "your-secret-key");

    // Attach the decoded token to the request object
    req.user = decodedToken;

    // Call the actual route handler
    return handler(req, res);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticate;
