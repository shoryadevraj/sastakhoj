import Wishlist from "../models/Wishlist.js";
export const listWishlist=async(req,res,next)=>{try{const items=await Wishlist.find({user:req.user._id}).populate({path:"product",populate:{path:"category",select:"name"}});res.json({success:true,items});}catch(e){next(e)}};
export const addWishlist=async(req,res,next)=>{try{await Wishlist.findOneAndUpdate({user:req.user._id,product:req.params.productId},{user:req.user._id,product:req.params.productId},{upsert:true,new:true});res.status(201).json({success:true});}catch(e){next(e)}};
export const removeWishlist=async(req,res,next)=>{try{await Wishlist.findOneAndDelete({user:req.user._id,product:req.params.productId});res.json({success:true});}catch(e){next(e)}};
