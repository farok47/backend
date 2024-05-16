const express = require("express");
const router = express.Router();
const {
  Author,
  validatecreateauth,
  validateupdateauth,
} = require("../models/Author");
const asynchandler = require("express-async-handler");


/**
 * @desc get all the auths
 * @router /api/auths
 * @method get
 * @access public
 */
router.get("/", async (req, res) => {
  const authorlist = await Author.find();
  res.status(200).json(authorlist);
});
/**
 * @desc get a auth by id
 * @router /api/auths/:id
 * @method get
 * @access public
 */
router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const auth = await Author.findById(req.params.id);
    if (auth) res.status(200).json(auth);
    else res.status(404).json({ message: "the auth not exists" });
  })
);
router.post("/",asynchandler(async (req, res) => {
    const { error } = validatecreateauth(req.body);
    if (error) res.status(400).json({ message: error.details[0].message });

    const auth = new Author({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await auth.save();
    res.status(201).json(result);
  })
);

/**
 * @desc update the auth
 * @router /api/auths/:id
 * @method put
 * @access public
 */
router.put("/:id",asynchandler(async (req, res) => {
  const { error } = validateupdateauth(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
 
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          nationality: req.body.nationality,
        },
      },
      { new: true }
    );
    res.status(200).json(author);

}) );

/**
 * @desc delete the auth
 * @router /api/auths/:id
 * @method deleete
 * @access public
 */

router.delete("/:id",asynchandler(async (req, res) => {
  
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "has been deleted" });
    } else res.status(400).json({ message: "not found" });

}) );

module.exports = router;
