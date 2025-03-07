import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Trending from "./components/trending";
import Hashtag from "./components/Hashtag";
import Popular from "./components/popular";
import SearchResults from "./components/searchResults";
import Author from "./components/author";
import VideoDetail from "./components/VideoDetail";
import Playlist from "./components/Playlist";
import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">VideoApp</div>
        <ul className="nav-links">
          <li><Link to="/trending">Trending</Link></li>
          <li><Link to="/popular">Popular</Link></li>
        </ul>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-bar"
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>
      </nav>

      <main>
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/hashtag/:tag" element={<Hashtag />} />
          <Route path="/playlist/:plid" element={<Playlist />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
