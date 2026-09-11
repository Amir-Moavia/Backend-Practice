import { asyncHandler  } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';

const registerUser = asyncHandler( async (req, res) => {
    
    const { fullName, email, username, password } = req.body;
    //this is equal to 
    // const fullName = req.body.fullName;
    // const email = req.body.email;
    // const username = req.body.username;
    // const password = req.body.password;
    console.log("Email : ", email);
    // here if the clint sent the request then the data will come to the server but
    // over there the clint will be waiting for the response so we will add
    
    res.status(200).json({
        success: true,
        message: "Data received successfully!"
    });
    
});

export { registerUser };