import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


// verify if the user is present or not
export const verifyJWT = asyncHandler(async(req, res) => {
try {
    
        // to take token access so here the req have the access to the cookie
        // if the user send the header the we will use the req.header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        // if token is not present 
        if(!token)
        {
            throw new ApiError(401, "Unauthorized request")
        }
    
        //if token is present then decode the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // find user 
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
       // check user
       if(!user)
       {
          throw new ApiError(401, "Invalid Access Token");
       }
    
       req.user = user;
      // next();
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token")
}

})