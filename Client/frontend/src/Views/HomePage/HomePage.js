import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormForPost from "../../Components/FormForPost/FormForPost";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import PostCard from "../../Components/PostCard/PostCard";
import SuggestedUserProfile from "../../Components/SuggestedUser/SuggestedUserProfile";
import {
  getSuggestedUser,
  getUserFollowingUserPosts,
} from "../../Redux/Slices/serverSlice";
import { resetUserProfile } from "../../Redux/Slices/UserSlices/GetUserProfile";
import "./HomePage.scss";

function HomePage() {
  const dispatch = useDispatch();
  const homeHeaderRef = useRef();

  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const isLoadingSuggUser = useSelector(
    (state) => state.suggestedUsersReducer.isLoading
  );
  const isLoadingUserPosts = useSelector(
    (state) => state.userPostsReduer.isLoading
  );
  const suggestedUser = useSelector(
    (state) => state.suggestedUsersReducer.suggestedUser
  );
  const followingUserPosts = useSelector(
    (state) => state.userPostsReduer.userPosts
  );
  const errorLogFromUserPost = useSelector(
    (state) => state.userPostsReduer.errorLog
  );
  const erroLogFromSuggUser = useSelector(
    (state) => state.suggestedUsersReducer.errorLog
  );

  function getRandomSuggestion() {
    dispatch(getSuggestedUser());
  }

  useEffect(() => {}, [
    isLoadingUser,
    followingUserPosts,
    suggestedUser,
    erroLogFromSuggUser,
    errorLogFromUserPost,
  ]);

  useEffect(() => {
    dispatch(getUserFollowingUserPosts());
    dispatch(resetUserProfile());
    getRandomSuggestion();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="home" ref={homeHeaderRef}>
        <div className="story-section"></div>
        <div className="home-left-section">
          <div className="home-left-header">
            <FormForPost />
          </div>
          <div className="home-left-body">
            {isLoadingUserPosts ? (
              <InfiniteSpinLoader
                width={150}
                message={"Getting Upadtes..."}
                setToCenter={"5%"}
              />
            ) : (
              <>
                {errorLogFromUserPost !== "" ? (
                  <p className="user-post-message">{errorLogFromUserPost}</p>
                ) : (
                  <div className="following-user-posts">
                    {followingUserPosts.map((item) => {
                      return (
                        <PostCard
                          key={item._id}
                          owner={item.owner}
                          post={item}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="home-right-section">
          <div className="suggested-users">
            <h1>Suggested For You</h1>
            <div className="profiles">
              {isLoadingSuggUser ? (
                <InfiniteSpinLoader
                  width={100}
                  message={"Getting New Suggestions"}
                  setToCenter={"12%"}
                />
              ) : (
                <>
                  {!erroLogFromSuggUser ? (
                    suggestedUser.map((item) => {
                      return (
                        <SuggestedUserProfile key={item.username} user={item} />
                      );
                    })
                  ) : (
                    <p className="error-msg-sugg-user">{erroLogFromSuggUser}</p>
                  )}
                </>
              )}
            </div>
            <button className="see-more-btn" onClick={getRandomSuggestion}>
              See More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
