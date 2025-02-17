import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Trending from "./trending";
import Popular from "./popular";
import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
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
          className="search-bar"
        />
      </nav>
      
      <main>
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
