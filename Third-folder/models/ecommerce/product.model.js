import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        description : {
            type: String,
            required: true,

        },
        name: {
            required: true,
            type: String,
        },
        productImage: {
            type: String,
        },
        price: {
            default: 0,
            type: Number,
        },
        stock: {
            default: 0,
            type: Number,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,

        },
        owner :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            
        }

    },{timestamps:true} // createdAt and updatedAt
)

export const Product = mongoose.model("Product", productSchema) 