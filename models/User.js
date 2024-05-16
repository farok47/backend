const joi = require("joi");
const { default: mongoose, model } = require("mongoose");

const userschema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 30,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


function validateregister(obj){
    const schema=joi.object({
        email:joi.string().required().trim().min(5).max(30),
        username:joi.string().required().trim().min(5).max(30),
        password:joi.string().required().trim().min(5).max(100),
        isadmin:joi.bool()
    })
    return schema.validate(obj)
}

function validatelogin(obj){
    const schema=joi.object({
        email:joi.string().required().trim().min(5).max(30),
        password:joi.string().required().trim().min(5).max(100),
    })
    return schema.validate(obj)
}
function validateupdate(obj){
    const schema=joi.object({
        email:joi.string().trim().min(5).max(30),
        username:joi.string().trim().min(5).max(30),
        password:joi.string().trim().min(5).max(100),
        isadmin:joi.bool()
    })
    return schema.validate(obj)
}
const User = mongoose.model("User", userschema);
module.exports = { User,validateregister,validatelogin ,validateupdate};
