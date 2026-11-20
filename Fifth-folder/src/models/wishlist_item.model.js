import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
    {
        wishlist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlist",
            required: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    },
    {
        timestamps: true
    }
);

wishlistItemSchema.index(
    { wishlist: 1, product: 1 },
    { unique: true }
);

export const WishlistItem = mongoose.model(
    "WishlistItem",
    wishlistItemSchema
);