import User from "../models/User.js"; import Shop from "../models/Shop.js"; import Product from "../models/Product.js"; import Category from "../models/Category.js";
export const dashboard=async(req,res,next)=>{try{const [users,shopkeepers,shops,products,pending]=await Promise.all([User.countDocuments(),User.countDocuments({role:"shopkeeper"}),Shop.countDocuments(),Product.countDocuments(),Shop.countDocuments({isVerified:false})]);res.json({success:true,stats:{users,shopkeepers,shops,products,pendingShops:pending}});}catch(e){next(e)}};
export const users=async(req,res,next)=>{try{res.json({success:true,users:await User.find().select("-password").sort({createdAt:-1})});}catch(e){next(e)}};
export const shops=async(req,res,next)=>{try{res.json({success:true,shops:await Shop.find().populate("owner","name email phone").sort({createdAt:-1})});}catch(e){next(e)}};
export const verifyShop=async(req,res,next)=>{try{const shop=await Shop.findByIdAndUpdate(req.params.id,{isVerified:req.body.approved===true},{new:true});res.json({success:true,shop});}catch(e){next(e)}};
export const products=async(req,res,next)=>{try{res.json({success:true,products:await Product.find().populate("category","name").sort({createdAt:-1})});}catch(e){next(e)}};
export const categories=async(req,res,next)=>{try{res.json({success:true,categories:await Category.find().sort({name:1})});}catch(e){next(e)}};
