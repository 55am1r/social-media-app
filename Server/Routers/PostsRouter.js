const router = require("express").Router();
const checkJWTKwy = require("../Middlewares/checkJWTKey");
const { success } = require("../Utilities/StatusMessages");

router.get("/", (req, res) => {
  res.send({ routes_init: ["/all"] });
});

router.get("/all", checkJWTKwy, (req, res) => {
  return res.send(success(200, [req.body, "These are all Posts"]));
});

module.exports = router;
