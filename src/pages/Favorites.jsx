import { useMemo } from "react";
import { Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import Gallery from "../components/Gallery";
import { EmptyState } from "../components/common";
export default function Favorites({ onOpen, onShare, onCollect }) {
  const { photos, favorites, viewMode } = useApp();
  const saved = useMemo(
    () => photos.filter((p) => favorites.includes(p.id)),
    [photos, favorites],
  );
  return (
    <main className="page">
      <div className="page-head">
        <div>
          <small>PERSONAL SPACE</small>
          <h1>
            My Favorites <Heart size={24} />
          </h1>
          <p>Your locally saved frames stay with you across refreshes.</p>
        </div>
      </div>
      {saved.length ? (
        <Gallery
          photos={saved}
          view={viewMode}
          onOpen={onOpen}
          onShare={onShare}
          onCollect={onCollect}
        />
      ) : (
        <EmptyState
          title="You haven't saved any photos yet."
          text="Tap the star on any frame to build your personal visual library."
          action="Explore photos"
          onAction={() => (location.href = "/explore")}
        />
      )}
    </main>
  );
}
