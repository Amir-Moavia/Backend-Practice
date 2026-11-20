import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { RefreshToken } from "../models/refreshToken.model.js";

import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateTokens.js";


// createing token session
const createTokenSession = async (user, familyId = crypto.randomUUID()) => {
  const accessToken = generateAccessToken(user);

  const { refreshToken, jti } = generateRefreshToken(
    user,
    familyId
  );

  const decoded = jwt.decode(refreshToken);

  await RefreshToken.create({
    userId: user._id,
    jti,
    tokenHash: crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex"),
    familyId,
    expiresAt: new Date(decoded.exp * 1000)
  });

  return {
    accessToken,
    refreshToken
  };
};


// creating cookies
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/v1/users"
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};


// register user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // 3. Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });

    // 4. Generate tokens and create session
    const { accessToken, refreshToken } =
      await createTokenSession(user);

    // 5. Set refresh token cookie
    setRefreshTokenCookie(res, refreshToken);

    // 6. Send response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",

      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        accessToken
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//user login 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // 2. Find user and explicitly include password
    const user = await User.findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 3. Verify password
    const isPasswordValid =
      await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // 4. Generate tokens
    const { accessToken, refreshToken } =
      await createTokenSession(user);

    // 5. Set refresh token cookie
    setRefreshTokenCookie(res, refreshToken);

    // 6. Return response
    return res.status(200).json({
      success: true,
      message: "Login successful",

      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        accessToken
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// refresh token endpoint and rotation
const refreshAccessToken = async (req, res) => {
  try {
    const incomingToken = req.cookies?.refreshToken;

    if (!incomingToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required"
      });
    }

    // 1. Verify refresh JWT
    const decoded = jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithms: ["HS256"],
        issuer: "ecommerce-api",
        audience: "ecommerce-users"
      }
    );

    // 2. Check token purpose
    if (decoded.tokenType !== "refresh") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    // 3. Hash incoming token
    const tokenHash = crypto
      .createHash("sha256")
      .update(incomingToken)
      .digest("hex");

    // 4. Find and atomically consume the active token
    const oldSession = await RefreshToken.findOneAndUpdate(
      {
        userId: decoded.sub,
        jti: decoded.jti,
        tokenHash,
        revokedAt: null,
        expiresAt: { $gt: new Date() }
      },
      {
        $set: { revokedAt: new Date() }
      },
      { new: false }
    );

    if (!oldSession) {
      // Check whether this was a previously revoked token.
      const previousSession = await RefreshToken.findOne({
        userId: decoded.sub,
        jti: decoded.jti
      });

      if (previousSession?.revokedAt) {
        // Reuse detected: revoke active tokens in this family.
        await RefreshToken.updateMany(
          {
            familyId: previousSession.familyId,
            revokedAt: null
          },
          {
            $set: { revokedAt: new Date() }
          }
        );
      }

      return res.status(401).json({
        success: false,
        message: "Refresh token is invalid or has been used"
      });
    }

    // 5. Check user still exists
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // 6. Generate replacement tokens in the same family
    const { accessToken, refreshToken } =
      await createTokenSession(user, oldSession.familyId);

    // 7. Set new refresh token cookie
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken
      }
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
};



// user logout
const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      const tokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      // Revoke the current refresh-token session
      await RefreshToken.findOneAndUpdate(
        {
          userId: req.user.id,
          tokenHash,
          revokedAt: null
        },
        {
          $set: { revokedAt: new Date() }
        }
      );
    }

    // Clear the refresh-token cookie
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// getting the currnet user 

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser
};