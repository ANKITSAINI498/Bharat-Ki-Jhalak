import { Copy, Mail, MessageCircle, Share2 } from "lucide-react";
import { Modal } from "./common";
export default function ShareModal({ open, onClose, photo, onToast }) {
  if (!photo) return null;
  const url = `${window.location.origin}/photo/${photo.id}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      onToast("Link copied.");
    } catch {
      onToast("Copy is unavailable in this browser.");
    }
  };
  const native = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url,
        });
      } catch {}
    } else copy();
  };
  return (
    <Modal open={open} onClose={onClose} title="Share photo">
      <p className="muted">{photo.title}</p>
      <div className="share-grid">
        <button onClick={native}>
          <Share2 /> Native Share
        </button>
        <button onClick={copy}>
          <Copy /> Copy Link
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(photo.title + " " + url)}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle /> WhatsApp
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(photo.title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          𝕏 Share
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(photo.title)}&body=${encodeURIComponent(url)}`}
        >
          <Mail /> Email
        </a>
      </div>
    </Modal>
  );
}
