import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ 

    firstName : {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required!!"],

    },
    phone: {
        type: String,
        required: true,
        unique: true,
        
    }


},{timestamps: true});

export const User = mongoose.model("User", userSchema);