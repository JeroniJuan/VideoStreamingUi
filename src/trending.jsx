import { useEffect, useState } from "react";
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
            <div className="thumbnail"></div> {}
            <div className="video-title">{video.title}</div>
            <div className="video-author">{video.author}</div>
            <div className="video-time">{video.publishedText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
