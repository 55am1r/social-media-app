const router = require("express").Router();
const GetAllFeeds = require("../Controller/PostController/GetAllFeeds");
const GetFollowingUserPosts = require("../Controller/PostController/GetFollowingUserPosts");
const LikesController = require("../Controller/PostController/LikesController");
const PostFeed = require("../Controller/PostController/PostFeed");
const PostUpdate = require("../Controller/PostController/PostUpdate");
const checkJWTKwy = require("../Middlewares/checkJWTKey");

router.get("/", (req, res) => {
  res.send({
    connection: true,
    routes_init: ["get-/all", "post-/feed", "post-/like-feed"],
  });
});

router.get("/all", checkJWTKwy, GetAllFeeds);
router.post("/feed", checkJWTKwy, PostFeed);
router.post("/like-feed", checkJWTKwy, LikesController);
router.get("/get-following-user-posts", checkJWTKwy, GetFollowingUserPosts);
router.put("/update-post", checkJWTKwy, PostUpdate);

module.exports = router;