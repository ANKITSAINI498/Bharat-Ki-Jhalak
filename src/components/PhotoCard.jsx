import { motion } from "framer-motion";
import { Download, Heart, MoreHorizontal, Share2, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function PhotoCard({ photo, onOpen, onShare, onCollect }) {
  const { favorites, liked, toggleFavorite, toggleLike } = useApp();
  const saved = favorites.includes(photo.id),
    isLiked = liked.includes(photo.id);
  return (
    <motion.article className="photo-card" layout whileHover={{ y: -4 }}>
      <button
        className="photo-image-wrap"
        onClick={() => onOpen(photo)}
        aria-label={`Open ${photo.title}`}
      >
        <img
          src={photo.thumbnail || photo.image}
          alt={photo.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.classList.add("img-error");
          }}
        />
        <span className="img-fallback">Image unavailable</span>
        <div className="image-overlay">
          <span>Open story</span>
        </div>
      </button>
      <div className="photo-info">
        <div className="photo-title-row">
          <div>
            <h3>{photo.title}</h3>
            <p>{photo.location}</p>
          </div>
          <button className="icon-btn ghost" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>
        <div className="photo-meta">
          <span>{photo.category}</span>
          <span>•</span>
          <span>{photo.photographer}</span>
        </div>
        <div className="card-actions">
          <button
            className={isLiked ? "action-btn active" : "action-btn"}
            onClick={() => toggleLike(photo.id)}
            aria-label="Like photo"
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
            <small>{photo.likes.toLocaleString()}</small>
          </button>
          <button
            className={saved ? "action-btn active" : "action-btn"}
            onClick={() => toggleFavorite(photo.id)}
            aria-label="Save to favorites"
          >
            <Star size={16} fill={saved ? "currentColor" : "none"} />
          </button>
          <button
            className="action-btn"
            onClick={() => onShare(photo)}
            aria-label="Share photo"
          >
            <Share2 size={16} />
          </button>
          <a
            className="action-btn"
            href={photo.image}
            target="_blank"
            rel="noreferrer"
            download
            aria-label="Download photo"
          >
            <Download size={16} />
          </a>
          <button
            className="action-btn"
            onClick={() => onCollect(photo)}
            aria-label="Add to collection"
          >
            +
          </button>
        </div>
      </div>
    </motion.article>
  );
}
