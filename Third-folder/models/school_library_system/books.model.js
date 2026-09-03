import mongoose from "mongoose";

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
        }

    },{timestamps: true}
);

export const Book = mongoose.model("Book", booksSchema);