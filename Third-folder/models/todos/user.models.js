import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        // username: String,
        // password:String,
        // email:String,
        // isActice: Boolean

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        },
        password: {
            type: String,
            required: [true, "Password is required"]
            
        }
    },
    {  timestamps:true  }
)

export const User = mongoose.model("User", userSchema)
