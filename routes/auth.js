const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken")
const asynchandler = require("express-async-handler");
const { User,validateregister, validatelogin, validateupdate,}= require("../models/User");
const bcrypt = require("bcryptjs");

const cors = require('cors');
router.use(cors());

/**
 * @desc register 
 * @router /api/auth/register
 * @method post
 * @access public
 */

router.post("/register", asynchandler(async (req, res) => {
    const { error } = validateregister(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).json({ message: "this user is already exists" });
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isadmin: req.body.isadmin,
    });
    const result = await user.save();
    const token = jwt.sign({id:user._id,isadmin:user.isadmin},process.env.jwt_secret_key,{expiresIn:"2d"})
    const { password, ...others } = result._doc;
    res.status(201).json({ ...others, token });
  })
);


/**
 * @desc login 
 * @router /api/auth/login
 * @method post
 * @access public
 */

router.post("/login", asynchandler(async (req, res) => {
  const { error } = validatelogin(req.body);
  if (error)
    return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).json({ message: "invalid email or password" });
  const ispassword = await bcrypt.compare(req.body.password,user.password);
 if (!ispassword) res.status(400).json({ message: "invalid email or password" });

 const token = jwt.sign({id:user._id,isadmin:user.isadmin},process.env.jwt_secret_key,{expiresIn:"2d"})

  const { password, ...others } = user._doc;
  res.status(200).json({ ...others, token });
})
);

module.exports=router