import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String
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

const categoryModel = mongoose.model("category", categorySchema)

export default categoryModel