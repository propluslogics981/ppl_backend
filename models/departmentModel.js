import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    department: {
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

const departmentModel = mongoose.model("department", departmentSchema)

export default departmentModel