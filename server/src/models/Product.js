import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},brand:String,category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},description:String,image:String,unit:String},{timestamps:true});
schema.index({name:"text",brand:"text"});
export default mongoose.model("Product",schema);
