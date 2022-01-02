import React, { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import PostService from "../API/PostService";
import PostList from "../components/PostList/PostList";
import PostFilter from "../components/PostFilter/PostFilter";
import PostForm from "../components/PostForm/PostForm";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/Modal/MyModal";
import MyLoader from "../components/UI/Loader/MyLoader";
import Pagination from "../components/UI/Pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


const  Posts = () => {
  //https://youtu.be/GNrdg3PzpJQ
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    // console.log(response.headers["x-total-count"]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /*get post from child component*/
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="App">
        <MyButton onClick={() => setModal(true)} style={{ marginTop: 30 }}>
          create user
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <hr style={{ margin: "15px 0" }} />
        <PostFilter filter={filter} setFilter={setFilter} />
        <MySelect
          value={limit}
          onChange={(value) => setLimit(value)}
          defaultValue="number of items per page"
          options={[
            { value: 5, name: 5 },
            { value: 10, name: 10 },
            { value: 25, name: 25 },
            { value: -1, name: 'all' },
          ]}
        />
        {postError && <h1 style={{ color: "red", textAlign: "center" }}>An error has occurred{postError}</h1>}
        <PostList remove={removePost} posts={sortedAndSerchedPosts} title="Post of JavaScript" />
        <div ref={lastElement}></div>
        {isPostsLoading && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "120px" }}>
            <MyLoader />
          </div>
        )}
        <Pagination page={page} changePage={changePage} totalPages={totalPages} />
      </div>
    </>
  );
}

export default Posts;
