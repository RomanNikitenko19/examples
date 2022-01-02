import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PostService from "../API/PostService";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommetsByPostId(id);
    setComments(response.data);
  });
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h2>you opened the post page with id = {params.id}</h2>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}.{post.title}
        </div>
      )}
      <h2>Comments</h2>
      {isComLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginTop: 15 }}>
              <h3>{comment.email}</h3>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
