import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchUser } from "../../Redux/Slices/serverSlice";
import { resetSearchUsers } from "../../Redux/Slices/UserSlices/SearchUser";
import { ProgressBar } from "react-loader-spinner";
import "./SearchUser.scss";
function SearchUser() {
  const dispatch = useDispatch();

  const location = useLocation();

  const searchInputRef = useRef();
  const searchLabelRef = useRef();
  const clearTextRef = useRef();
  const searchSectionRef = useRef();
  const foundUserBlock = useRef();
  const [searchUserInt, setSearchUser] = useState("NA");

  const usersFound = useSelector((state) => state.searchUserReducer.foundUsers);
  const isLoadingSearchUser = useSelector(
    (state) => state.searchUserReducer.isLoading
  );
  const errorLogSearchUser = useSelector(
    (state) => state.searchUserReducer.errorLog
  );

  useEffect(() => {}, [usersFound, isLoadingSearchUser, errorLogSearchUser]);
  useEffect(() => {
    if (searchUserInt !== "NA") {
      dispatch(searchUser({ userId: searchUserInt }));
    }
    // eslint-disable-next-line
  }, [searchUserInt]);
  useEffect(() => {
    if (location.pathname === "/home") {
      searchSectionRef.current.style.display = "block";
    } else {
      searchSectionRef.current.style.display = "none";
    }
  }, [location]);

  return (
    <div className="search-section" ref={searchSectionRef}>
      <i
        className="fa-solid fa-magnifying-glass"
        onClick={() => {
          searchInputRef.current.focus();
        }}
        ref={searchLabelRef}
      ></i>
      <input
        type="text"
        ref={searchInputRef}
        onFocus={() => {
          searchInputRef.current.classList.add("input-focus");
        }}
        onChange={(e) => {
          RegExp(/(^\s{1,5})/g).test(e.target.value) || e.target.value === ""
            ? setTimeout(() => {
                clearTextRef.current.style.display = "none";
                foundUserBlock.current.style.display = "none";
              }, 0)
            : setTimeout(() => {
                clearTextRef.current.style.display = "block";
                foundUserBlock.current.style.display = "flex";
              }, 0);
          setSearchUser(e.target.value);
        }}
        onBlur={(e) => {
          RegExp(/(^\s{1,5})/g).test(e.target.value) ||
          e.target.value === "" ? (
            setTimeout(() => {
              searchInputRef.current.classList.remove("input-focus");
            }, 0)
          ) : (
            <></>
          );
        }}
      />
      <i
        className="fa-regular fa-vacuum"
        ref={clearTextRef}
        onClick={(e) => {
          searchInputRef.current.value = "";
          searchInputRef.current.focus();
          dispatch(resetSearchUsers());
          e.currentTarget.style.display = "none";
        }}
      ></i>
      <div className="search-users" ref={foundUserBlock}>
        {isLoadingSearchUser ? (
          ((foundUserBlock.current.style.height = "fit-content"),
          (
            <div className="load-to-search">
              <ProgressBar
                height={50}
                width={50}
                borderColor="#7D80C7"
                barColor="#BED1FC"
              />
            </div>
          ))
        ) : (
          <div className="found-users">
            {errorLogSearchUser === "" && usersFound.length > 0 ? (
              (usersFound.length > 3
                ? (foundUserBlock.current.style.height = "150px")
                : (foundUserBlock.current.style.height = "fit-content"),
              usersFound.map((item) => {
                return (
                  <span className="found-user-name" key={item.username}>
                    {item.username}
                  </span>
                );
              }))
            ) : errorLogSearchUser !== "" ? (
              ((foundUserBlock.current.style.height = "fit-content"),
              (<span className="err-in-found-user"> {errorLogSearchUser}</span>))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
