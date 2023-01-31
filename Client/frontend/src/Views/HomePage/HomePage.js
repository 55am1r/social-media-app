import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import SuggestedUserProfile from "../../Components/SuggestedUser/SuggestedUserProfile";
import UserImage from "../../Components/UserImage/UserImage";
import {
  getSuggestedUser,
  getUserFollowingUserPosts,
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

  const isLoading = useSelector((state) => state.user.isLoading);
  const userPosts = useSelector((state) => state.user.userPosts);
  const suggestedUser = useSelector((state) => state.user.suggestedUser);

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

  function handleEmptySpace(e) {
    e.target.value = "";
    e.target.classList.remove("int-active");
    btnRef.current.style.display = "none";
    textAreaRef.current.classList.remove("margin-bottom");
    imgLblRef.current.classList.remove("text-int-focus-label");
  }
  function getRandomSuggestion() {
    dispatch(getSuggestedUser());
  }
  useEffect(() => {}, [
    caption,
    imageString,
    isLoading,
    userPosts,
    suggestedUser,
  ]);

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
            <UserImage />
            <form action="" ref={formRef}>
              <textarea
                ref={textAreaRef}
                className="text-int"
                name="caption"
                id="caption"
                rows={1}
                cols={1}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
                onFocus={(e) => {
                  e.target.classList.add("int-active");
                  btnRef.current.style.display = "block";
                  imgLblRef.current.classList.add("text-int-focus-label");
                  // homeHeaderRef.current.style.height = `${homeHeaderRef.current.scrollHeight}px`;
                }}
                onBlur={(e) => {
                  // homeHeaderRef.current.style.height = `${homeHeaderRef.current.scrollHeight}px`;
                  (RegExp(/(^\s{1,5})/g).test(e.target.value) ||
                    e.target.value === "") &&
                  !imageString
                    ? handleEmptySpace(e)
                    : e.target.classList.add("int-active");
                }}
                placeholder="Let Your Thoughts Hear Others..."
              />
              <label htmlFor="image" ref={imgLblRef}>
                {imageString ? (
                  <div className="img-class">
                    {isLoading ? <InfiniteSpinLoader /> : ""}
                    <img src={imageString} alt="upload.img" />
                    <i
                      className="fa-light fa-xmark-to-slot"
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
                type="button"
                value="Post"
                className="post-btn"
                ref={btnRef}
              />
            </form>
          </div>
          <div className="home-left-body">
            {isLoading ? (
              <InfiniteSpinLoader />
            ) : typeof userPosts === "string" ? (
              userPosts
            ) : (
              "array"
            )}
          </div>
        </div>
        <div className="home-right-section">
          <h1>Suggested For You</h1>
          <div className="profiles">
            {suggestedUser.map((item) => {
              return <SuggestedUserProfile key={item.username} user={item} />;
            })}
          </div>
          <button className="see-more-btn" onClick={getRandomSuggestion}>
            See More
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
