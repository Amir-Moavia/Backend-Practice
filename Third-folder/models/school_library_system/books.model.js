import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);




const booksSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
        },
        totalCopies: {
            type: Number,
            required: true,
        },
        availableCopies: {
            type: Number,
            required: true,
        },
        reviews: [reviewSchema],
        
        location: {
            shelf: { type: String, required: true }, 
            floor: { type: Number, default: 1 }, 
        },
        isbn: {
            type: String,
            unique: true,
            sparse: true, 
        },

            },{timestamps: true}
        );

export const Book = mongoose.model("Book", booksSchema);