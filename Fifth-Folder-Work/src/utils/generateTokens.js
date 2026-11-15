import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      tokenType: "access"
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      subject: user._id.toString(),
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      algorithm: "HS256",
      issuer: "ecommerce-api",
      audience: "ecommerce-users"
    }
  );
};

export const generateRefreshToken = (user, familyId) => {
  const jti = crypto.randomUUID();

  const refreshToken = jwt.sign(
    {
      tokenType: "refresh"
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      subject: user._id.toString(),
      jwtid: jti,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      algorithm: "HS256",
      issuer: "ecommerce-api",
      audience: "ecommerce-users"
    }
  );

  return {
    refreshToken,
    jti
  };
};