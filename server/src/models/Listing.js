import mongoose from "mongoose";
const schema=new mongoose.Schema({product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},shop:{type:mongoose.Schema.Types.ObjectId,ref:"Shop",required:true},price:{type:Number,required:true,min:0},stockAvailable:{type:Boolean,default:true},quantity:{type:Number,default:0,min:0}},{timestamps:true});
schema.index({product:1,shop:1},{unique:true});
export default mongoose.model("Listing",schema);
