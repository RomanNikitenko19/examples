import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter/PostFilter";
import PostForm from "./components/PostForm/PostForm";
import PostList from "./components/PostList/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";
// import Counter from './components/Counter/Counter';
// import ClassCounter from "./components/ClassCounter/ClassCounter";
import "./style/App.css";

function App() {
  //https://youtu.be/GNrdg3PzpJQ
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript 1", body: "JavaScript - multi-paradigm programming language." },
    { id: 2, title: "JavaScript 2", body: "JavaScript - multi-paradigm programming language." },
    { id: 3, title: "JavaScript 3", body: "JavaScript - multi-paradigm programming language." },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const sortedPost = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSerchedPosts = useMemo(() => {
    return sortedPost.filter((post) => post.title.toLowerCase().includes(filter.query));
  }, [filter.query, sortedPost]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  /*get post from child component*/
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <>
      <div className="App">
        <MyButton onClick={() => setModal(true)} style={{marginTop: 30}}>
          create user
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <hr style={{ margin: "15px, 0" }} />
        <PostFilter filter={filter} setFilter={setFilter} />
        <PostList remove={removePost} posts={sortedAndSerchedPosts} title="Post of JavaScript" />
      </div>
    </>
  );
}

export default App;
