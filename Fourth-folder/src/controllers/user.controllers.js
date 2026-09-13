import { asyncHandler  } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async (req, res) => {


    // step 1: getting user details from frontend 
    const { fullName, email, username, password } = req.body;
    //this is equal to 
    // const fullName = req.body.fullName;
    // const email = req.body.email;
    // const username = req.body.username;
    // const password = req.body.password;


    console.log("Email : ", email);

    // here if the clint sent the request then the data will come to the server but
    // over there the clint will be waiting for the response so we will add

 

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


    // step 2: validation if not empty
    if ([fullName,email,username,password].some((field) => 
    {
       return field?.trim() === "";
    })) {
        throw new ApiError(400, "All fields are required!!");
    }

    // step 3: check if user already exists 
    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )
    console.log(existedUser);

    if(existedUser)
    {
        throw new ApiError(409, "The username or email already existed");
    }
    console.log(req.files);
    

    // step 4: check for images / check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath);
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // step 5: upload them to cloudinary 
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // check if user is uploaded successfully or not
    if (!avatar) {
        throw new ApiError(400, "Avatar is required !!");
    }

    
   // step 6: create user object  / create entry in database
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

    // step 7: removing the password and refresh tokens from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // step 8: check for user creation
    if (!createdUser)
    {
        throw new ApiError(500, "Something went Wrong regester failed")
    }

//   step 9: return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    );


    


    
});

export { registerUser };  