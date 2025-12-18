import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-post" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
