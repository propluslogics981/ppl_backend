import mongoose from "mongoose";

const postionSchema = new mongoose.Schema({
    positionName: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const positionModel = mongoose.model("position", postionSchema)

export default positionModel