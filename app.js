const express = require("express");
const {notfound,errorhandler}=require('./middlewares/error')
const connecttodb=require("./config/db")

 require("dotenv").config();

connecttodb()

const app = express();
app.use(express.json());

app.use("/api/books", require("./routes/books"));
app.use("/api/auths", require("./routes/auths"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

app.use(notfound);
app.use(errorhandler);



const port = process.env.port;

app.listen(port, () => console.log(`the server is running on port ${port}`));
