import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./author.css";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/channels/${authorId}`)
      .then((response) => response.json())
      .then((data) => setAuthorData(data))
      .catch((error) => console.error("Error fetching author data:", error));

      fetch(`http://localhost:3000/api/v1/channels/${authorId}/videos`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Videos data:", data);
    
        const videosList = data?.videos || []; 
        setVideos(videosList);
      })
      .catch((error) => console.error("Error fetching author videos:", error));
    
  }, [authorId]);

  if (!authorData) return <p>Loading author details...</p>;

  const originalUrl = authorData.authorThumbnails?.[0]?.url || "";
  const imageId = originalUrl.split("/").pop();
  const newImageUrl = `http://localhost:3000/ggpht/${imageId}`;

  return (
    <div className="author-container">
      <h1>{authorData.author}</h1>
      <img className="author-avatar" src={newImageUrl} alt={authorData.author} />
      <p>{authorData.description}</p>
      <p>Subscribers: {authorData.subCount}</p>
      <p>Videos: {authorData.videoCount}</p>

      <div className="trending-container">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div className="video-card" key={index}>
              <img
                className="thumbnail"
                src={`http://localhost:3000${video.videoThumbnails?.[1]?.url}`}
                alt={video.title}
              />
              <div className="video-title">{video.title}</div>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default Author;
