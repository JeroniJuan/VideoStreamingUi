import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./trending.css";

const Hashtag = () => {
  const { tag } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/hashtag/${encodeURIComponent(tag)}?page=1`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Resultados de hashtag:", data);
        setResults(data.results);
      })
      .catch((error) =>
        console.error("Error al obtener resultados de hashtag:", error)
      );
  }, [tag]);

  return (
    <div>
      <h1>Hashtag: #{tag}</h1>
      <div className="trending-container">
        {results.map((video, index) => (
          <div className="video-card" key={index}>
            <Link to={`/video/${encodeURIComponent(video.videoId)}`}>
              <img
                className="thumbnail"
                src={`http://localhost:3000${video.videoThumbnails?.[1]?.url}`}
                alt={video.title}
              />
              <div className="video-title">{video.title}</div>
            </Link>
            <div className="video-author">{video.author}</div>
            <div className="video-time">{video.publishedText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hashtag;
