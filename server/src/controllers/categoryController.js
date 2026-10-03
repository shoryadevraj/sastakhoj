import Category from "../models/Category.js";
export const listCategories=async(req,res,next)=>{try{res.json({success:true,categories:await Category.find().sort({name:1})});}catch(e){next(e)}};
export const createCategory=async(req,res,next)=>{try{const c=await Category.create(req.body);res.status(201).json({success:true,category:c});}catch(e){next(e)}};
export const deleteCategory=async(req,res,next)=>{try{await Category.findByIdAndDelete(req.params.id);res.json({success:true});}catch(e){next(e)}};
