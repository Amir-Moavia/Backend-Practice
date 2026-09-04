import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        age: { 
            type: Number,
            required: true,
            min: 0,
        },
        gender: {
            type: String,
            enum: ["MALE","FEMALE","OTHER"],
            required: true,

        },
        bloodGroup: {
            type: String,
            enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"],
            required: true,
        },
        emergencyContact: {
            type: String,
            required: true,
        },
        admittedIn: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
        }


    },{timestamps: true}
);

export const Patient = mongoose.model("Patient", patientSchema);