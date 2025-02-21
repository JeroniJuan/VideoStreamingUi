import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./trending.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:3000/api/v1/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="trending-container">
        {results.map((video, index) => (
          <div className="video-card" key={index}>
            <div className="video-title">{video.title}</div>
            <div className="video-author">{video.author}</div>
            <div className="video-time">{video.publishedText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
