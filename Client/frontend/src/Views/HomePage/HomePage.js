import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteSpinLoader from "../../Components/InfiniteSpinLoader/InfiniteSpinLoader";
import UserImage from "../../Components/UserImage/UserImage";
import { setLoadingUser } from "../../Redux/Slices/userSlice";
import "./HomePage.scss";
function HomePage() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {}, [isLoading]);

  function handleOnChangeImgInput(e) {
    dispatch(setLoadingUser(true));
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        //jh
        dispatch(setLoadingUser(false));
      }
    };
  }
  function handleEmptySpace(e) {
    e.target.value = "";
    e.target.classList.remove("int-active");
  }
  return (
    <div className="home">
      {isLoading ? <InfiniteSpinLoader /> : ""}
      <div className="home-left-section">
        <div className="home-header-section">
          <UserImage />
          <form action="">
            <textarea
              className="text-int"
              name="caption"
              id="caption"
              rows={1}
              cols={1}
              onFocus={(e) => {
                e.target.classList.add("int-active");
              }}
              onBlur={(e) => {
                RegExp(/(^\s{1,5})/g).test(e.target.value) ||
                e.target.value === ""
                  ? handleEmptySpace(e)
                  : console.log(e.target.value);
              }}
              placeholder="Let Your Thoughts Hear Others..."
            />
            <label htmlFor="image">
              <i className="fa-thin fa-cloud-plus"></i>
            </label>
            <input
              className="image-int"
              type="file"
              id="image"
              accept="image/jpeg,image/png"
              onChange={handleOnChangeImgInput}
            />
          </form>
        </div>
      </div>
      <div className="home-right-section"></div>
    </div>
  );
}

export default HomePage;
