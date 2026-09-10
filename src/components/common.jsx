import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, LoaderCircle, X } from "lucide-react";
import { useEffect } from "react";

export function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message, onClose]);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
        >
          <Check size={16} />
          <span>{message}</span>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Close notification"
          >
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="empty-state">
      <AlertCircle size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <button className="btn primary" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}

export function Skeletons({ count = 8 }) {
  return (
    <div className="gallery-grid">
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-img" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}

export function Loader() {
  return (
    <div className="loader">
      <LoaderCircle className="spin" size={22} /> Loading curated visuals…
    </div>
  );
}

export function Modal({ open, title, onClose, children, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`modal ${wide ? "wide" : ""}`}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
