const DeleteProfile = require("../Controller/UserController/DeleteProfile");
const FollowersController = require("../Controller/UserController/FollowersController");
const GetUserFollowers = require("../Controller/UserController/GetUserFollowers");
const GetUserFollowings = require("../Controller/UserController/GetUserFollowings");
const checkJWTKey = require("../Middlewares/checkJWTKey");
const { success } = require("../Utilities/StatusMessages");

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send(success(200, { routes_init: ["/follow-user"] }));
});

router.get("/get-user-followers", checkJWTKey, GetUserFollowers);
router.get("/get-user-followings", checkJWTKey, GetUserFollowings);
router.post("/follow-user", checkJWTKey, FollowersController);
router.delete("/delete-profile", checkJWTKey, DeleteProfile);
module.exports = router;
