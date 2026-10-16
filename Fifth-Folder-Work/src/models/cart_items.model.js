import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        productSize: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductSize",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

cartItemSchema.index(
    { cart: 1, productSize: 1 },
    { unique: true }
);

export const CartItem = mongoose.model(
    "CartItem",
    cartItemSchema
);