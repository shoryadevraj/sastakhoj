import mongoose from "mongoose";
const schema=new mongoose.Schema({product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},shop:{type:mongoose.Schema.Types.ObjectId,ref:"Shop",required:true},price:{type:Number,required:true,min:0},recordedAt:{type:Date,default:Date.now}});
export default mongoose.model("PriceHistory",schema);
