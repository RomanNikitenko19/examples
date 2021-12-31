import React, { useState } from "react";
import PostForm from "./components/PostForm/PostForm";
import PostList from "./components/PostList/PostList";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
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
  const [selectedSort, setSelectedSort] = useState('');
  const [serchQuery, setSearhQuery] = useState('');

  function getSortedPosts() {
    console.log('sort posts');
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }

  const sortedPost = getSortedPosts();
  const sortPost = (sort) => {
    setSelectedSort(sort);
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  /*get post from child component*/
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <>
      <div className="App">
        <PostForm create={createPost} />
        <hr style={{ margin: "15px, 0" }} />
        <div>
          <MyInput value={serchQuery} onChange={(e) => setSearhQuery(e.target.value)} placeholder="search..." />
          <MySelect
            value={selectedSort}
            onChange={sortPost}
            defaultValue="sort by"
            options={[
              { value: "title", name: "by name" },
              { value: "body", name: "by description" },
            ]}
          />
        </div>
        {posts.length ? (
          <PostList remove={removePost} posts={sortedPost} title="Post of JavaScript" />
        ) : (
          <h1 style={{ textAlign: "center" }}>posts not found</h1>
        )}
      </div>
    </>
  );
}

export default App;
