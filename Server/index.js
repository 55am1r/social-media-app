//DEPENDENCIES
const exp = require("express");
const app = require("express")();
const dotenv = require("dotenv").config("./.env");
const dbConnect = require("./ConnectDB");
const mainRouter = require("./Routers/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(exp.json({limit:'15mb'}));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
  })
);
app.use(morgan("common"));
app.use(cookieParser());
app.use("/", mainRouter);
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
});

//CODE TO START SERVER
app.listen(port, () => {
  dbConnect();
  console.log(`Connected to ${port}`);
});
