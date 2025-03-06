import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./trending.css";

const SearchResults = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (queryParam) {
      fetch(`http://localhost:3000/api/v1/search?q=${encodeURIComponent(queryParam)}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Resultados de búsqueda:", data);
          setResults(data);
        })
        .catch((error) =>
          console.error("Error al obtener los resultados de búsqueda:", error)
        );
    }
  }, [queryParam]);

  return (
    <div>
      <h1>Resultados de búsqueda para "{queryParam}"</h1>
      <div className="trending-container">
        {results.map((item, index) => {
          if (item.type === "video") {
            return (
              <div className="video-card" key={index}>
                <Link to={`/video/${encodeURIComponent(item.videoId)}`}>
                  <img
                    className="thumbnail"
                    src={`http://localhost:3000${item.videoThumbnails?.[1]?.url}`}
                    alt={item.title}
                  />
                  <div className="video-title">{item.title}</div>
                </Link>
                <div className="video-author">{item.author}</div>
                <div className="video-time">{item.publishedText}</div>
              </div>
            );
          } else if (item.type === "playlist") {
            return (
              <div className="video-card" key={index}>
                <Link to={`/playlist/${encodeURIComponent(item.playlistId)}`}>
                  <img
                    className="thumbnail"
                    src={item.playlistThumbnail}
                    alt={item.title}
                  />
                  <div className="video-title">{item.title}</div>
                </Link>
                <div className="video-author">{item.author}</div>
                <div className="video-time">{item.videoCount} videos</div>
              </div>
            );
          } else if (item.type === "channel") {
            return (
              <div className="video-card" key={index}>
                <Link to={`/channel/${encodeURIComponent(item.authorId)}`}>
                  <img
                    className="thumbnail"
                    src={item.authorThumbnails?.[0]?.url}
                    alt={item.author}
                  />
                  <div className="video-title">{item.author}</div>
                </Link>
                <div className="video-author">Subs: {item.subCount}</div>
                <div className="video-time">{item.videoCount} videos</div>
              </div>
            );
          } else if (item.type === "hashtag") {
            return (
              <div className="video-card" key={index}>
                <Link to={`/hashtag/${encodeURIComponent(item.url)}`}>
                  <div className="video-title">#{item.title}</div>
                </Link>
                <div className="video-author">
                  {item.videoCount} videos • {item.channelCount} canales
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default SearchResults;
