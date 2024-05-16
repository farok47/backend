const { default: mongoose } = require("mongoose")
const monggose=require("mongoose")
const joi = require("joi");


const bookschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20
    },
    desc:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20
    },auth:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
})

function validationcreatebook(obj) {
    const schema = joi.object({
      name: joi.string().trim().max(10).min(3).required(),
      desc: joi.string().trim().required().max(30).min(3),
      auth: joi.string().trim().max(30).min(3).required(),
  
    });
    return schema.validate(obj);
  }
  function validationupdatebook(obj) {
    const schema = joi.object({
      name: joi.string().trim().max(10).min(3),
      desc: joi.string().trim().max(30).min(3),
      auth: joi.string().trim().max(30).min(3),
    });
    return schema.validate(obj);
  }
const Book=monggose.model("Book",bookschema)
module.exports={Book,validationcreatebook,validationupdatebook}