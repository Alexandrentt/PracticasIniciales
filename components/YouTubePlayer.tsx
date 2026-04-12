import React from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title, className = "" }) => {
  // Extraer video ID de URL de YouTube si es una URL completa
  const getYouTubeId = (url: string): string => {
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1];
    }
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    return url; // Si ya es solo el ID
  };

  const youtubeId = getYouTubeId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;

  return (
    <div className={`aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ${className}`}>
      <iframe
        src={embedUrl}
        title={title || "Video de YouTube"}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};
