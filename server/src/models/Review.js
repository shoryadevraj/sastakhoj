import mongoose from "mongoose";
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},shop:{type:mongoose.Schema.Types.ObjectId,ref:"Shop",required:true},rating:{type:Number,required:true,min:1,max:5},comment:{type:String,trim:true,maxlength:500}},{timestamps:true});
schema.index({user:1,shop:1},{unique:true});
export default mongoose.model("Review",schema);
