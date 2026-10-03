import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect=async(req,res,next)=>{
  try{
    const header=req.headers.authorization;
    if(!header?.startsWith("Bearer ")) return res.status(401).json({success:false,message:"Authentication required"});
    const decoded=jwt.verify(header.split(" ")[1],process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select("-password");
    if(!user) return res.status(401).json({success:false,message:"User not found"});
    req.user=user; next();
  }catch(e){res.status(401).json({success:false,message:"Invalid or expired token"});}
};
export const roles=(...allowed)=>(req,res,next)=>allowed.includes(req.user.role)?next():res.status(403).json({success:false,message:"Access denied"});
