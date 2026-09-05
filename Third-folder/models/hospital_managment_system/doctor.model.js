import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        salary: {
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
        },
        experienceInYears: {
            type: Number,
            default: 0,
        },
        worksInHospitals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        },
    ],
    },{timestamps: true}
);

export const Doctor = mongoose.model("Doctor", doctorSchema);