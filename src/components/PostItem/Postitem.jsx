import React from "react";
import MyButton from "../UI/button/MyButton";

const PostItem = (props) => {
  const { remove, post, number } = props;
  const { title, body } = post;
  return (
    <>
      <div className="post">
        <div className="post_content">
          <strong>
            {number}.{title}
          </strong>
          <div>{body}</div>
        </div>
        <div className="post_btn">
          <MyButton onClick={() => remove(post)}>delete</MyButton>
        </div>
      </div>
    </>
  );
}

export default PostItem;


