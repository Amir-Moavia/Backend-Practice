import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        size: {
            type: Number,
            required: [true, "Product size is required!!"],
            min: 1
        },

        stockQuantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

productSizeSchema.index(
    { product: 1, size: 1 },
    { unique: true }
);

export const ProductSize = mongoose.model(
    "ProductSize",
    productSizeSchema
);