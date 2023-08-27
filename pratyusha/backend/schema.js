import { Int32 } from "mongodb";
import mongoose from "mongoose";
const schema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:Number,
        required:true
    }
},
{ timestamps: true });
const record=mongoose.model('record',schema)
export default record