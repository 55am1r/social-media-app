import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import PostCard from "../../Components/PostCard/PostCard";
import SuggestedUserProfile from "../../Components/SuggestedUser/SuggestedUserProfile";
import {
  getSuggestedUser,
  getUserFollowingUserPosts,
  postUserStatus,
} from "../../Redux/Slices/serverSlice";
import {
  setLoadingUser,
  setRequirePageError,
} from "../../Redux/Slices/userSlice";
import "./HomePage.scss";

function HomePage() {
  const dispatch = useDispatch();
  const homeHeaderRef = useRef();
  const btnRef = useRef();
  const formRef = useRef();
  const textAreaRef = useRef();
  const imgLblRef = useRef();

  const [caption, setCaption] = useState("");
  const [imageString, setImageString] = useState("");

  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const isLoadingSuggUser = useSelector(
    (state) => state.suggestedUsersReducer.isLoading
  );
  const suggestedUser = useSelector(
    (state) => state.suggestedUsersReducer.suggestedUser
  );
  const userPosts = useSelector((state) => state.userPostsReduer.userPosts);
  const errorLogFromUserPost = useSelector(
    (state) => state.userPostsReduer.errorLog
  );
  const erroLogFromSuggUser = useSelector(
    (state) => state.suggestedUsersReducer.errorLog
  );
  const postSubmitLoading = useSelector(
    (state) => state.postUserStatusReducer.isLoading
  );

  function handleOnChangeImgInput(e) {
    textAreaRef.current.focus();
    dispatch(setLoadingUser(true));
    try {
      const file = e.target.files[0];
      if (file) {
        textAreaRef.current.classList.add("margin-bottom");
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          if (fileReader.readyState === fileReader.DONE) {
            setImageString(fileReader.result);
          }
        };
      }
    } catch (e) {
      dispatch(setRequirePageError(e.message));
      console.log(e);
    } finally {
      dispatch(setLoadingUser(false));
    }
  }
  function handleEmptySpace() {
    setCaption("");
    setImageString("");
    btnRef.current.style.display = "none";
    imgLblRef.current.classList.remove("text-int-focus-label");
    textAreaRef.current.classList.remove("int-active");
    textAreaRef.current.classList.remove("margin-bottom");
    textAreaRef.current.blur();
  }
  function handleOnBlurInt(e) {
    formRef.current.classList.remove("form-active");
    RegExp(/(^\s{1,5})/g).test(e.target.value) ||
    (e.target.value === "" && !imageString)
      ? handleEmptySpace(e)
      : e.target.classList.add("int-active");
  }
  function handleFocusInt(e) {
    e.target.classList.add("int-active");
    btnRef.current.style.display = "block";
    imgLblRef.current.classList.add("text-int-focus-label");
    formRef.current.classList.add("form-active");
  }

  function getRandomSuggestion() {
    dispatch(getSuggestedUser());
  }

  useEffect(() => {}, [
    caption,
    imageString,
    isLoadingUser,
    userPosts,
    suggestedUser,
    erroLogFromSuggUser,
    errorLogFromUserPost,
  ]);
  useEffect(() => {
    if (!postSubmitLoading) {
      handleEmptySpace();
    }
  }, [postSubmitLoading]);
  useEffect(() => {
    dispatch(getUserFollowingUserPosts());
    getRandomSuggestion();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="home" ref={homeHeaderRef}>
        <div className="home-left-section">
          <div className="home-left-header">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(postUserStatus({ caption, imageString }));
              }}
              ref={formRef}
            >
              {postSubmitLoading ? <InfiniteSpinLoader width={180} /> : ""}
              <textarea
                ref={textAreaRef}
                className="text-int"
                name="caption"
                id="caption"
                rows={1}
                cols={1}
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                onFocus={(e) => {
                  handleFocusInt(e);
                }}
                onBlur={(e) => {
                  handleOnBlurInt(e);
                }}
                placeholder="Let Your Thoughts Hear Others..."
              />
              <label htmlFor="image" ref={imgLblRef}>
                {imageString ? (
                  <div className="img-class">
                    {isLoadingUser ? <InfiniteSpinLoader width={100} /> : ""}
                    <img src={imageString} alt="upload.img" />
                    <i
                      className="fa-light fa-trash-can-undo"
                      onClick={() => {
                        setImageString("");
                        textAreaRef.current.classList.remove("margin-bottom");
                      }}
                    ></i>
                  </div>
                ) : (
                  <i className="fa-thin fa-cloud-plus"></i>
                )}
              </label>

              <input
                className="image-int"
                type="file"
                id="image"
                accept="image/jpeg,image/png"
                onChange={handleOnChangeImgInput}
              />
              <input
                type="submit"
                value="Post"
                className="post-btn"
                ref={btnRef}
              />
            </form>
          </div>
          <div className="home-left-body">
            {isLoadingUser ? (
              <InfiniteSpinLoader width={150} />
            ) : (
              <>
                {typeof errorLogFromUserPost === "string" ? (
                  <p className="user-post-message">{errorLogFromUserPost}</p>
                ) : (
                  <div className="following-user-posts">
                    {userPosts.map((item) => {
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
                <InfiniteSpinLoader width={100} />
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
