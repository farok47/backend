const express=require("express")
const router=express.Router()
const asynchandler=require("express-async-handler")
const {User,validateupdate}=require("../models/User")
const bcrypt = require("bcryptjs");
const {verifytokenandauthorisation,verifytokenandadmin}=require("../middlewares/verifytoken")


/**
 * @desc UPDATE THE USER
 * @router /api/users:/:id
 * @method PUT
 * @acces public
 */

router.put("/:id",verifytokenandauthorisation,asynchandler(async(req,res)=>{


 const {error}=validateupdate(req.body)
 if(error)
 return res.status(400).json({message:error.details[0].message})
  if(req.body.password){
    const salt=await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
  }

const updateuser=await User.findByIdAndUpdate(req.params.id,{$set:{
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
}},{new:true})
res.status(200).json(updateuser)
}))

/**
 * @desc get all users
 * @router /api/users
 * @method get
 * @acces private(only admin)
 */

router.get("/",verifytokenandadmin,asynchandler(async(req,res)=>{
const users=await User.find().select("-password")
res.status(200).json(users)
 }))

 /**
 * @desc get user by id
 * @router /api/users:/:id
 * @method get
 * @acces private(only admin)
 */

 router.get("/:id",verifytokenandauthorisation,asynchandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select("-password")
if (user)
  res.status(200).json(user)
  else
  res.status(400).json({message:"the user not found"})
   }))
   /**
 * @desc delete th user
 * @router /api/users:/:id
 * @method delete
 * @acces private(only admin or user him self)
 */

 router.delete("/:id",verifytokenandadmin,asynchandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select("-password")
if (user){
await User.findByIdAndDelete(req.params.id)
  res.status(200).json({message:"the user has been delete"})}
  else
  res.status(400).json({message:"the user not found"})
   }))
module.exports=router