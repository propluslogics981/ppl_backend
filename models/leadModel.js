import mongoose,{Schema,model} from "mongoose";

const leadSchema = new Schema({
    name: {
       type:String
    },
   
}, { timestamps: true })

const leadModel = model("lead", leadSchema)

export default leadModel