import { asyncHandler  } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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

    // if (fullName === "") {
    //     throw new ApiError(400, "Full Name Is Required!!!" );   
    // }
    // if (email === "") {
    //     throw new ApiError(400, "Email Is Required!!!" );   
    // }
    // if (username === "") {
    //     throw new ApiError(400, "Username Is Required!!!" );   
    // }
    // if (password === "") {
    //     throw new ApiError(400, "Password Is Required!!!" );   
    // }

    // we can also write the above code as 
    if ([fullName,email,username,password].some((field) => 
    {
       return field?.trim() === "";
    })) {
        throw new ApiError(400, "All fields are required!!");
    }

    const existedUser = User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )
    console.log(existedUser);

    if(existedUser)
    {
        throw new ApiError(409, "The username or email already existed");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath);
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required !!");
    }

   const user = await User.create(
        {
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email, 
            password,
            username: username.toLowerCase()
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser)
    {
        throw new ApiError(500, "Something went Wrong regester failed")
    }


    


    
});

export { registerUser };  