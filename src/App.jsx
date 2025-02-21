import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Trending from "./components/trending";
import Popular from "./components/popular";
import SearchResults from "./components/searchResults";
import Author from "./components/author"; // Importa la nueva página de autor
import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

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
          className="search-bar"
        />
      </nav>

      <main>
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/author/:authorId" element={<Author />} /> {/* Nueva ruta para el autor */}
        </Routes>
      </main>
    </>
  );
}

export default App;
