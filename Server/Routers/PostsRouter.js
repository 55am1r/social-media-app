const router = require("express").Router();
const { getAllPosts } = require("../Controller/PostController/GetAllFeeds");
const GetFollowingUserPosts = require("../Controller/PostController/GetFollowingUserPosts");
const {
  likesController,
} = require("../Controller/PostController/LikesController");
const { postFeed } = require("../Controller/PostController/PostFeed");
const checkJWTKwy = require("../Middlewares/checkJWTKey");

router.get("/", (req, res) => {
  res.send({
    connection: true,
    routes_init: ["get-/all", "post-/feed", "post-/like-feed"],
  });
});

router.get("/all", checkJWTKwy, getAllPosts);
router.post("/feed", checkJWTKwy, postFeed);
router.post("/like-feed", checkJWTKwy, likesController);
router.get("/get-following-user-posts", checkJWTKwy, GetFollowingUserPosts);
module.exports = router;
