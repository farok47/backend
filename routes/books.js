const express = require("express");
const router = express.Router();
const {Book,validationcreatebook,validationupdatebook}=require("../models/Book")
const asynchandler=require("express-async-handler");

/**
 * @desc get all the books
 * @router /api/books
 * @method get
 * @acces public
 */

router.get("/",async (req, res) => {
  const books=await Book.find().populate("auth",["firstname","lastname"])
  res.status(200).json(books)
  
});
/**
 * @desc get a book by id
 * @router /api/books/:id
 * @method get
 * @acces public
 */

router.get("/:id",asynchandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (book) res.status(200).json(book);
  else res.status(404).json({ message: "the book not found" });
}));
/**
 * @desc post a new book
 * @router /api/books
 * @method post
 * @acces public
 */

router.post("/", asynchandler(async(req, res) => {
  const { error } = validationcreatebook(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const book = new Book({
    name: req.body.name,
    desc: req.body.desc,
    auth:req.body.auth
  });
const result=await book.save()
  res.status(201).json(result);
}));
/**
 * @desc update the book
 * @router /api/books
 * @method put
 * @acces public
 */
router.put("/:id", asynchandler(async(req, res) => {
  const { error } = validationupdatebook(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const book =await Book.findByIdAndUpdate(req.params.id,{$set:{
    name: req.body.name,
    desc: req.body.desc,
    auth:req.body.auth
  }},{new:true});
  res.status(200).json(book)
}));

/**
 * @desc update the book
 * @router /api/books
 * @method delete
 * @acces public
 */
router.delete("/:id",asynchandler(async (req, res) => {
  
  const book = await Book.findByIdAndDelete((req.params.id));
  if (book){
   await Book.findByIdAndDelete(req.params.id)
   res.status(200).json({ message: "the book has been deleted" });}
  else res.status(404).json({ message: "not found" });
}));


module.exports = router;
