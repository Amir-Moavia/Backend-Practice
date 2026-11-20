import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    // 2. Extract Bearer token
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required"
      });
    }

    // 3. Verify JWT
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithms: ["HS256"],
        issuer: "ecommerce-api",
        audience: "ecommerce-users"
      }
    );

    // 4. Check token purpose
    if (decodedToken.tokenType !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token"
      });
    }

    // 5. Attach authenticated user information
    req.user = {
      id: decodedToken.sub
    };

    // 6. Continue request
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token"
    });
  }
};