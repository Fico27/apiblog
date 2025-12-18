import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import PostContent from "./components/PostContent";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostContent />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/new-post" element={<CreatePost />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
