import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,

        },
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
        },
        consultationFee:{
            type: Number,
            required: true,
            min: 0,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        }
    },{timestamps: true}
);

export const Doctor = mongoose.model("Doctor", doctorSchema);