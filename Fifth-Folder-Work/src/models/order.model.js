import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled"
            ],
            default: "pending"
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0
        },

        shippingFee: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        shippingAddress: {
            type: String,
            required: true,
            trim: true
        },

        paymentMethod: {
            type: String,
            required: true,
            trim: true
        },

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model("Order", orderSchema);