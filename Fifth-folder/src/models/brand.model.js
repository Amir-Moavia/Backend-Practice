import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required!!"],
            unique: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        logoUrl: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Brand = mongoose.model("Brand", brandSchema);