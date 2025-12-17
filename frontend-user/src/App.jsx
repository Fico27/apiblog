import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import PostContent from "./components/PostContent";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
