import mongoose from "mongoose";
const schema=new mongoose.Schema({owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},name:{type:String,required:true,trim:true},description:String,phone:String,address:{street:String,city:String,state:String,pincode:String},location:{type:{type:String,enum:["Point"],default:"Point"},coordinates:{type:[Number],default:[0,0]}},openingTime:String,closingTime:String,isVerified:{type:Boolean,default:false},rating:{type:Number,default:0},reviewCount:{type:Number,default:0}},{timestamps:true});
schema.index({location:"2dsphere"});
export default mongoose.model("Shop",schema);
