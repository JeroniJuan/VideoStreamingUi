import { useEffect, useState } from "react";
import "./popular.css";

const Popular = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/popular")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching popular videos:", error));
  }, []);

  return (
    <div>
      <h1>Popular Videos</h1>
      <div className="popular-container">
        {videos.map((video, index) => (
          <div className="video-card" key={index}>
            <img className="thumbnail" src={`http://localhost:3000${video.videoThumbnails[1].url}`}></img>
            <div className="video-title">{video.title}</div>
            <div className="video-author">{video.author}</div>
            <div className="video-time">{video.publishedText}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
