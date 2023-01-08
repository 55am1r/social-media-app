const router = require("express").Router();
const authRouter = require("./AuthRouter");
const postRouter = require("./PostsRouter");
const userRouter = require("./UserRouter");

router.get("/", (req, res) => {
  res.json({ routes_init: ["/user", "/posts"] });
});

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/user", userRouter);

module.exports = router;