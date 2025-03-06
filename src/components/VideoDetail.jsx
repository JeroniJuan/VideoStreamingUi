import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./VideoDetail.css";

const VideoDetail = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/videos/${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos del video:", data);
        setVideoData(data);
      })
      .catch((error) =>
        console.error("Error al obtener los detalles del video:", error)
      );

    fetch(`http://localhost:3000/api/v1/comments/${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de comentarios:", data);
        setComments(data.comments);
      })
      .catch((error) =>
        console.error("Error al obtener los comentarios:", error)
      );

    fetch(`http://localhost:3000/api/v1/related/${videoId}`)
      .then((response) => response.text())
      .then((text) => {
        if (text) {
          const data = JSON.parse(text);
          console.log("Datos de videos relacionados:", data);
          setRelatedVideos(data);
        } else {
          console.log("No se retornó ningún dato para videos relacionados");
          setRelatedVideos([]); 
        }
      })
      .catch((error) =>
        console.error("Error al obtener los videos relacionados:", error)
      );
  }, [videoId]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-detail-page">
      <div className="video-player">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={videoData.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="video-info">
        <h1>{videoData.title}</h1>
        <div className="channel-info">
          <img
            src={videoData.authorThumbnails?.[0]?.url}
            alt={videoData.author}
            className="channel-thumbnail"
          />
          <Link
            to={`/author/${encodeURIComponent(videoData.authorId)}`}
            className="channel-name"
          >
            {videoData.author}
          </Link>
        </div>
        <div className="video-stats">
          <span>{videoData.viewCount} visualizaciones</span>
          <span>{videoData.publishedText}</span>
          <span>{videoData.likeCount} Likes</span>
        </div>
        <p className="video-description">{videoData.description}</p>
      </div>

      <div className="video-comments">
        <h2>Comentarios</h2>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-author">{comment.author}</div>
              <div className="comment-text">{comment.content}</div>
            </div>
          ))
        ) : (
          <p>No hay comentarios.</p>
        )}
      </div>

      <div className="related-videos">
        <h2>Vídeos relacionados</h2>
        {videoData.recommendedVideos && videoData.recommendedVideos.length > 0 ? (
          videoData.recommendedVideos.map((video, index) => (
            <div key={index} className="related-video-card">
              <Link to={`/video/${encodeURIComponent(video.videoId)}`}>
                <img
                  className="thumbnail"
                  src={`http://localhost:3000${video.videoThumbnails?.[1]?.url}`}
                  alt={video.title}
                />
              </Link>
              <div className="related-video-title">{video.title}</div>
            </div>
          ))
        ) : relatedVideos && relatedVideos.length > 0 ? (
          relatedVideos.map((video, index) => (
            <div key={index} className="related-video-card">
              <Link to={`/video/${encodeURIComponent(video.videoId)}`}>
                <img
                  className="thumbnail"
                  src={`http://localhost:3000${video.videoThumbnails?.[1]?.url}`}
                  alt={video.title}
                />
              </Link>
              <div className="related-video-title">{video.title}</div>
            </div>
          ))
        ) : (
          <p>No hay vídeos relacionados.</p>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
