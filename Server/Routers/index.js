const router = require("express").Router();
const authRouter = require("./AuthRouter");
const postRouter = require("./PostsRouter");

router.get("/", (req, res) => {
  res.json({ routes_init: ["/user", "/posts"] });
});

router.use("/user", authRouter);
router.use("/posts", postRouter);

module.exports = router;
