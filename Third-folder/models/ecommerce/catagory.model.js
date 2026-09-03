import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

    },{timestamps:true} // createdAt and updatedAt
)

export const Category = mongoose.model("Category", catagorySchema)