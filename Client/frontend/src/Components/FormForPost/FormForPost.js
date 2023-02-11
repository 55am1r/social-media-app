import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUserStatus } from "../../Redux/Slices/serverSlice";
import {
  setLoadingUser,
  setRequirePageError,
} from "../../Redux/Slices/userSlice";
import InfiniteSpinLoader from "../InfiniteSpinLoader/InfiniteSpinLoader";
import "./FormForPost.scss";
function FormForPost() {
  const dispatch = useDispatch();
  const btnRef = useRef();
  const formRef = useRef();
  const textAreaRef = useRef();
  const imgLblRef = useRef();

  const [caption, setCaption] = useState("");
  const [imageString, setImageString] = useState("");

  const isLoadingUser = useSelector((state) => state.user.isLoading);
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
  useEffect(() => {}, [caption, imageString]);
  useEffect(() => {
    if (!postSubmitLoading) {
      handleEmptySpace();
    }
  }, [postSubmitLoading]);
  return (
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
      <input type="submit" value="Post" className="post-btn" ref={btnRef} />
    </form>
  );
}

export default FormForPost;
