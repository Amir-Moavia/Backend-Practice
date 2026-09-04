import mongoose from "mongoose";


const borrowSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",

        },
        borrowDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["BORROWED", "RETURNED", "OVERDUE"],
            default: "BORROWED",
        },
        
        returnDate: {
            type: Date,
            required: true,
        },
        fineAmount: {
            type: Number,
            default: 0,
            min: 0, 
        },
        isFinePaid: {
            type: Boolean,
            default: false,
        },

    },{timestamps: true}
);

export const BorrowRecord = mongoose.model("BorrowRecord", borrowSchema);