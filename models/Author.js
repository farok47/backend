const  mongoose  = require("mongoose");
const joi = require("joi");


const Authorschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
      trim: true,
    },
    nationality: {
      typr: String,
      
    },image:{
      type:String,
      default:"default-avatar.png"
    }

  },
  { timestamps: true }
);


function validatecreateauth(obj) {
  const schema = joi.object({
    firstname: joi.string().required().max(20).min(5).trim(),
    lastname: joi.string().required().max(20).min(5).trim(),
    nationality: joi.string(),
  });
  return schema.validate(obj);
}
function validateupdateauth(obj) {
  const schema = joi.object({
    firstname: joi.string().max(20).min(5).trim(),
    lastname: joi.string().max(20).min(5).trim(),
    nationality: joi.string(),
    image: joi.string(),
  });
  return schema.validate(obj);
}
const Author=mongoose.model("Author",Authorschema)
module.exports={Author,validatecreateauth,validateupdateauth }
