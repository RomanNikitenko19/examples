import React from 'react';
import PostItem from '../PostItem/Postitem';

const PostList = ({ remove, posts, title }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post, index) => (
        <PostItem key={post.id} remove={remove} post={post} number={index + 1} />
      ))}
    </div>
  );
};

export default PostList;