import React from "react";
import "./PostCard.scss";
function PostCard(props) {
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
          <img src={props.post.image.url} alt={props.post} />
        ) : (
          <></>
        )}
      </div>
      <div className="post-info">
        <p className="likes">
          <i className="fa-thin fa-heart"></i> Like . {props.post.likes.length}
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
