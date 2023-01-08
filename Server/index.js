//DEPENDENCIES
const exp = require("express");
const app = require("express")();
const dotenv = require("dotenv").config("./.env");
const dbConnect = require("./ConnectDB");
const mainRouter = require("./Routers/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(exp.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(morgan("common"));
app.use(cookieParser());
app.use("/", mainRouter);

//CODE TO START SERVER
app.listen(port, () => {
  dbConnect();
  console.log(`Connected to ${port}`);
});