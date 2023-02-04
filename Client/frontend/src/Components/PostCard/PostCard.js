import React from "react";
import "./PostCard.scss";
function PostCard(props) {
  return (
    <div className="post-card">
      <img src={props.owner.avatar.url} alt={props.owner.username} />
      {props.owner.username}
      <p>{props.post.caption}</p>
      {props.post.image ? (
        <img src={props.post.image} alt={props.post} />
      ) : (
        <></>
      )}
      <p>Likes:{props.post.likes.length}</p>
      <p>Comments:{props.post.comments.length}</p>
    </div>
  );
}

export default PostCard;
