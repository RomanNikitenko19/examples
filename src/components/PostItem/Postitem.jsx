import React from "react";
import MyButton from "../UI/button/MyButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PostItem = (props) => {
  const { remove, post } = props;
  const { title, body, id } = post;
  const router = useHistory();

  return (
    <>
      <div className="post">
        <div className="post_content">
          <strong>
            {id}.{title}
          </strong>
          <div>{body}</div>
        </div>
        <div className="post_btns">
          <MyButton onClick={() => router.push(`/posts/${id}`)}>
            add
          </MyButton>
          <MyButton onClick={() => remove(post)}>
            delete
          </MyButton>
        </div>
      </div>
    </>
  );
}

export default PostItem;


