import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postControlLike } from "../../Redux/Slices/serverSlice";
import "./PostCard.scss";
function PostCard(props) {
  const thinRef = useRef();
  const solidRef = useRef();

  const dispatch = useDispatch();

  const [liked, setLike] = useState(false);

  const currUser = useSelector((state) => state.profileReducer.profile);
  useEffect(() => {
    props.post.likes.includes(currUser._id) ? setLike(true) : setLike(false);
    // eslint-disable-next-line
  }, [props.post]);

  useEffect(() => {
    if (liked) {
      solidRef.current?.classList.add("highlight");
      setTimeout(() => {
        solidRef.current?.classList.remove("highlight");
      }, 150);
    } else {
      thinRef.current?.classList.add("highlight");
      setTimeout(() => {
        thinRef.current?.classList.remove("highlight");
      }, 150);
    }
    // eslint-disable-next-line
  }, [liked]);

  return (
    <div className="post-card">
      <div className="post-owner-details">
        <img src={props.owner.avatar.url} alt={props.owner.username} />
        <p className="owner-name">
          {props.owner.username}{" "}
          <span className="postedon">{props.post.postedon}</span>{" "}
        </p>
      </div>
      <div className="post-cap-img">
        <p>{props.post.caption}</p>
        {props.post.image ? (
          <img src={props.post.image.url} alt={props.post} loading={"lazy"} />
        ) : (
          <></>
        )}
      </div>
      <div className="post-info">
        <p
          className="likes"
          onClick={() => {
            dispatch(postControlLike({ postId: props.post._id }));
          }}
        >
          {liked ? (
            <i className="fa-solid fa-heart color-red" ref={solidRef}></i>
          ) : (
            <i className="fa-thin fa-heart" ref={thinRef}></i>
          )}
          Like . {props.post.likes.length}
        </p>
        <hr
          style={{
            borderTop: "1px solid #000",
            width: "1px",
            height: " 20px",
          }}
        />
        <p>
          <i className="fa-duotone fa-comments"></i> Comment .{" "}
          {props.post.comments.length}
        </p>
      </div>
    </div>
  );
}

export default PostCard;
