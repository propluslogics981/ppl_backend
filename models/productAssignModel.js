import mongoose, { Schema, model } from "mongoose";

const productAssignSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'employee'
    },
    assignedDate: {
        type: Date,
        required: true
    },
    returnDate:{
        type: Date,
        
    },
    maintenceDetails: [{
        maintanceIssueDate: {
            type: Date,
            
        },
        reason:{
            type:String


        },
        maintanceIssueSolveDate: {
            type: Date,
          
        },
        maintence: {
            type: Boolean,
           
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const productModelAssign = model("productsAssign", productAssignSchema);

export default productModelAssign;
