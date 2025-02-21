import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Trending from "./components/trending";
import Popular from "./components/popular";
import SearchResults from "./components/searchResults";
import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm}`);
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
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          onKeyDown={handleSearch}
          className="search-bar"
        />
      </nav>

      <main>
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
