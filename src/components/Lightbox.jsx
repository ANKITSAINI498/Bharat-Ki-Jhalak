import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Expand,
  Heart,
  Info,
  Minus,
  Plus,
  RotateCcw,
  RotateCw,
  Share2,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Modal } from "./common";

export default function Lightbox({ photos, index, onClose, onShare }) {
  const { favorites, liked, toggleFavorite, toggleLike } = useApp();
  const [zoom, setZoom] = useState(1),
    [rotation, setRotation] = useState(0),
    [details, setDetails] = useState(false);
  const photo = photos[index];
  const [current, setCurrent] = useState(index);
  useEffect(() => setCurrent(index), [index]);
  const p = photos[current];
  const go = (d) => {
    setCurrent((i) => (i + d + photos.length) % photos.length);
    setZoom(1);
    setRotation(0);
  };
  useEffect(() => {
    const h = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName))
        return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(0.5, z - 0.25));
      if (e.key.toLowerCase() === "l") toggleLike(p.id);
      if (e.key.toLowerCase() === "s") toggleFavorite(p.id);
      if (e.key.toLowerCase() === "f")
        document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [p, onClose]);
  if (!p) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="viewer-top">
          <div>
            <strong>{p.title}</strong>
            <span>{p.location}</span>
          </div>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Close viewer"
          >
            <X />
          </button>
        </div>
        <button
          className="viewer-nav left"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          <ChevronLeft />
        </button>
        <div
          className="viewer-stage"
          onWheel={(e) =>
            setZoom((z) => Math.max(0.5, Math.min(3, z - e.deltaY * 0.001)))
          }
        >
          <motion.img
            src={p.image}
            alt={p.title}
            style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <button
          className="viewer-nav right"
          onClick={() => go(1)}
          aria-label="Next photo"
        >
          <ChevronRight />
        </button>
        <div className="viewer-bottom">
          <div className="viewer-actions">
            <button
              className={
                liked.includes(p.id) ? "viewer-btn active" : "viewer-btn"
              }
              onClick={() => toggleLike(p.id)}
            >
              <Heart
                size={17}
                fill={liked.includes(p.id) ? "currentColor" : "none"}
              />{" "}
              Like
            </button>
            <button
              className={
                favorites.includes(p.id) ? "viewer-btn active" : "viewer-btn"
              }
              onClick={() => toggleFavorite(p.id)}
            >
              <Star
                size={17}
                fill={favorites.includes(p.id) ? "currentColor" : "none"}
              />{" "}
              Save
            </button>
            <button className="viewer-btn" onClick={() => onShare(p)}>
              <Share2 size={17} /> Share
            </button>
            <a
              className="viewer-btn"
              href={p.image}
              target="_blank"
              rel="noreferrer"
              download
            >
              <Download size={17} /> Download
            </a>
            <button className="viewer-btn" onClick={() => setDetails(true)}>
              <Info size={17} /> Info
            </button>
          </div>
          <div className="zoom-controls">
            <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}>
              <Minus />
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(3, z + 0.25))}>
              <Plus />
            </button>
            <button onClick={() => setZoom(1)}>
              <RotateCcw />
            </button>
            <button onClick={() => setRotation((r) => r - 90)}>
              <RotateCcw />
            </button>
            <button onClick={() => setRotation((r) => r + 90)}>
              <RotateCw />
            </button>
            <button
              onClick={() => document.documentElement.requestFullscreen?.()}
            >
              <Expand />
            </button>
          </div>
        </div>
        <Modal
          open={details}
          onClose={() => setDetails(false)}
          title="Photo Details"
        >
          <div className="details-grid">
            <div>
              <span>Title</span>
              <b>{p.title}</b>
            </div>
            <div>
              <span>Location</span>
              <b>{p.location}</b>
            </div>
            <div>
              <span>Country</span>
              <b>{p.country}</b>
            </div>
            <div>
              <span>Category</span>
              <b>{p.category}</b>
            </div>
            <div>
              <span>Photographer</span>
              <b>{p.photographer}</b>
            </div>
            <div>
              <span>Dimensions</span>
              <b>
                {p.width} × {p.height}
              </b>
            </div>
            <div>
              <span>Likes</span>
              <b>{p.likes.toLocaleString()}</b>
            </div>
            <div>
              <span>Views</span>
              <b>{p.views.toLocaleString()}</b>
            </div>
          </div>
          <p className="details-desc">{p.description}</p>
          <div className="tags">
            {(p.tags || []).map((t) => (
              <span key={t}>#{t.replace(/\s+/g, "-")}</span>
            ))}
          </div>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
}
