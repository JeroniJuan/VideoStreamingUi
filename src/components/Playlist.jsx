import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Playlist.css"; 

const Playlist = () => {
  const { plid } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const [page, setPage] = useState(1); 

  useEffect(() => {
    
    fetch(`http://localhost:3000/api/v1/playlists/${plid}?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de la playlist:", data);
        setPlaylistData(data);
      })
      .catch((error) =>
        console.error("Error al obtener la playlist:", error)
      );
  }, [plid, page]);

  if (!playlistData) {
    return <div>Loading playlist details...</div>;
  }

  return (
    <div className="playlist-container">
      <h1>{playlistData.title}</h1>
      <div className="playlist-author">
        <img
          src={playlistData.authorThumbnails?.[0]?.url}
          alt={playlistData.author}
          className="channel-thumbnail"
        />
        <Link to={`/channel/${encodeURIComponent(playlistData.authorId)}`}>
          {playlistData.author}
        </Link>
      </div>
      <p className="playlist-description">{playlistData.description}</p>
      <p className="playlist-stats">
        {playlistData.videoCount} videos • {playlistData.viewCountText}
      </p>
      <div className="playlist-videos trending-container">
        {playlistData.videos.map((video, index) => (
          <div className="video-card" key={index}>
            <Link to={`/video/${encodeURIComponent(video.videoId)}`}>
              <img
                className="thumbnail"
                src={`http://localhost:3000${video.videoThumbnails?.[1]?.url}`}
                alt={video.title}
              />
              <div className="video-title">{video.title}</div>
            </Link>
            <div className="video-time">{video.lengthSeconds} sec</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
