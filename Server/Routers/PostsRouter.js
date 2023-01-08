const router = require("express").Router();
const GetAllFeeds = require("../Controller/PostController/GetAllFeeds");
const GetFollowingUserPosts = require("../Controller/PostController/GetFollowingUserPosts");
const GetOwnPosts = require("../Controller/PostController/GetOwnPosts");
const GetUserPostsById = require("../Controller/PostController/GetUserPostsById");
const LikesController = require("../Controller/PostController/LikesController");
const PostDelete = require("../Controller/PostController/PostDelete");
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
router.get("/get-own-posts", checkJWTKwy, GetOwnPosts);
router.get("/get-following-user-posts", checkJWTKwy, GetFollowingUserPosts);
router.get("/get-user-post", checkJWTKwy, GetUserPostsById);
router.post("/post-feed", checkJWTKwy, PostFeed);
router.post("/like-feed", checkJWTKwy, LikesController);
router.put("/update-post", checkJWTKwy, PostUpdate);
router.delete("/delete-post", checkJWTKwy, PostDelete);
module.exports = router;
