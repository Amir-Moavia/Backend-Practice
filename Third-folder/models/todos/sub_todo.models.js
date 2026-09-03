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
        }
    })

export const User = mongoose.model("User", userSchema)
