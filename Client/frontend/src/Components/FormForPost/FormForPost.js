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
  const uploadImgRef = useRef();

  const [caption, setCaption] = useState("");
  const [imageString, setImageString] = useState("");
  const [imgSize, setImgSize] = useState(0);

  const isLoadingUser = useSelector((state) => state.user.isLoading);
  const postSubmitLoading = useSelector(
    (state) => state.postUserStatusReducer.isLoading
  );

  function handleLabelImageChange() {
    if (imgSize >= 0 && imgSize < 5) {
      uploadImgRef.current.classList.add("img-success-shadow");
      setTimeout(() => {
        uploadImgRef.current.classList.remove("img-success-shadow");
      }, 4000);
    } else if (imgSize > 5) {
      dispatch(
        setRequirePageError(
          `Image Should be less than 5MB. Posted with ${imgSize}MB`
        )
      );
      uploadImgRef.current.classList.add("img-error-shadow");
      setTimeout(() => {
        uploadImgRef.current.classList.remove("img-error-shadow");
      }, 4000);
    }
  }
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
        setImgSize((file.size / 1048576).toFixed(0));
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
  function handleOnSubmit(e) {
    e.preventDefault();
    if (imgSize >= 0 && imgSize < 5) {
      dispatch(postUserStatus({ caption, imageString }));
    } else {
      dispatch(
        setRequirePageError(
          `Image Should be less than 5MB. Posted with ${imgSize}MB`
        )
      );
      uploadImgRef.current.classList.add("img-error-shadow");
      setTimeout(() => {
        uploadImgRef.current.classList.remove("img-error-shadow");
      }, 4000);
    }
  }
  useEffect(() => {}, [caption, imageString, imgSize]);
  useEffect(() => {
    if (!postSubmitLoading) {
      handleEmptySpace();
    }
  }, [postSubmitLoading]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e);
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
            <img
              src={imageString}
              alt="upload.img"
              ref={uploadImgRef}
              onLoad={handleLabelImageChange}
              onChange={handleLabelImageChange}
            />
            <i
              className="fa-solid fa-sync fa-spin"
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
