import React, { useState } from "react";
import "./card.css";

// 임시로 이미지 경로를 public 폴더로 변경
const Heart = "/img/heart.svg";
const HeartFilled = "/img/heartFilled.svg";
const Comment = "/img/comment.svg";
const Share = "/img/share.svg";
const Info = "/img/info.svg";

interface Post {
  userImg: string;
  fullname: string;
  postImg: string;
  username: string;
}

interface CardProps {
  post: Post;
  socket: any;
  user: string;
}

const Card: React.FC<CardProps> = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type: number) => {
    type === 1 && setLiked(true);

    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;

