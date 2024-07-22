import mongoose, { Schema, model } from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true

    },

    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'department',
        required: true
    },
    subDepartmentId: {
        type: Schema.Types.ObjectId,
        ref: 'subdepartment',
        required: true
    },
    positionId: {
        type: Schema.Types.ObjectId,
        ref: 'position',
        required: true
    },
    employeeEmail: {
        type: String,

        required: true
    },
    phone: {
        type: Number,
        required: true

    },
    employeeDob: {
        type: Date,
        required: true


    },
    joiningDate: {
        type: Date,
        required: true
    },
    proplusId:{
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

const employeeModel = model("employee", employeeSchema)

export default employeeModel