const mongoose = require("mongoose");


async function connecttodb() {
  try {
   await mongoose.connect(process.env.url)
    console.log("connected to db");
  } catch (error) {
    (error) => console.log("connection to db failed", error);
  }
}
// mongoose
//   .connect(process.env.url)
//   .then(() => console.log("connected to db"))
//   .catch((error) => console.log("connection to db failed", error));
module.exports=connecttodb