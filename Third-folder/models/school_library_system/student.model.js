import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rollNumber: {
            type: String ,
            required: true,
            unique: true,
        },
        grade: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        isSuspended: {
            type: Boolean,
            default: false,
        },
        maxAllowedBooks: {
            type: Number,
            default: 3,
            max: 5,
        },

    },{timestamps: true}
);

export const Student = mongoose.model("Student", studentSchema);