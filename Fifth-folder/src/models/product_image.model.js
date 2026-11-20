import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        imageUrl: {
            type: String,
            required: [true, "Image URL is required!!"],
            trim: true
        },

        isPrimary: {
            type: Boolean,
            default: false
        },

        displayOrder: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

export const ProductImage = mongoose.model(
    "ProductImage",
    productImageSchema
);