import React from 'react';
import PostItem from '../PostItem/Postitem';

const PostList = ({ remove, posts, title }) => {

  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>posts not found</h1>;
  }
  
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