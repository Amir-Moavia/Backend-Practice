import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
    {
        medicineName: {
            type: String,
            required: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        frequency: {
            type: String,
            required: true,
        },
        durationDays: {
            type: Number,
            required: true,
        },

    },{timestamps: true}
);

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["SCHEDULED", "COMPLETED","CANCELLED"],
            default: "SCHEDULED",
        },
        symptoms: {
            type: [],
        },
        prescriptions: [prescriptionSchema],
        
    },{timestamps: true}
);