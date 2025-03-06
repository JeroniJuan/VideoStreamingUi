import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./trending.css";

const Trending = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/trending")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching trending videos:", error));
  }, []);

  return (
    <div>
      <h1>Trending Videos</h1>
      <div className="trending-container">
        {videos.map((video, index) => (
          <div className="video-card" key={index}>
            <Link to={`/video/${encodeURIComponent(video.videoId)}`}>
              <img
                className="thumbnail"
                src={`http://localhost:3000${video.videoThumbnails[1].url}`}
                alt={video.title}
              />
              <div className="video-title">{video.title}</div>
            </Link>
            <Link to={`/author/${encodeURIComponent(video.authorId)}`} className="video-author">
              {video.author}
            </Link>
            <div className="video-time">{video.publishedText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
