import React from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from '../PostItem/Postitem';

const PostList = ({ remove, posts, title }) => {

  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>posts not found</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;