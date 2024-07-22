import mongoose from "mongoose";

const subDepartmentSchema = new mongoose.Schema({
    subDepartment: {
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

const departmentModel = mongoose.model("subdepartment", subDepartmentSchema)

export default departmentModel