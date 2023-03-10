const DeleteProfile = require("../Controller/UserController/DeleteProfile");
const FollowersController = require("../Controller/UserController/FollowersController");
const GetUserFollowers = require("../Controller/UserController/GetUserFollowers");
const GetUserFollowings = require("../Controller/UserController/GetUserFollowings");
const LogOUtController = require("../Controller/AuthController/LogOutController");
const checkJWTKey = require("../Middlewares/checkJWTKey");
const { success } = require("../Utilities/StatusMessages");
const getMyProfile = require("../Controller/UserController/getMyProfile");
const getAllSuggestedUsers = require("../Controller/UserController/getAllSuggestedUsers");
const GetAllUserName = require("../Controller/UserController/SearchUser");

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send(success(200, { routes_init: ["/follow-user"] }));
});

router.get("/get-user-followers", checkJWTKey, GetUserFollowers);
router.get("/get-user-followings", checkJWTKey, GetUserFollowings);
router.post("/follow-user", checkJWTKey, FollowersController);
router.delete("/delete-profile", checkJWTKey, DeleteProfile, LogOUtController);
router.post("/get-profile", checkJWTKey, getMyProfile);
router.get("/get-suggested-users", checkJWTKey, getAllSuggestedUsers);
router.post("/search-user", checkJWTKey, GetAllUserName);
module.exports = router;
