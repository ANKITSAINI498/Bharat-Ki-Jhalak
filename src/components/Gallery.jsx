import { Grid2X2, List, LayoutGrid, Rows3 } from "lucide-react";
import PhotoCard from "./PhotoCard";
import { Skeletons } from "./common";

export function ViewSwitcher({ value, onChange }) {
  return (
    <div className="view-switcher">
      {[
        ["grid", Grid2X2],
        ["masonry", LayoutGrid],
        ["compact", Rows3],
        ["list", List],
      ].map(([v, I]) => (
        <button
          key={v}
          className={value === v ? "selected" : ""}
          onClick={() => onChange(v)}
          aria-label={`${v} view`}
        >
          <I size={16} />
        </button>
      ))}
    </div>
  );
}
export default function Gallery({
  photos,
  view,
  onOpen,
  onShare,
  onCollect,
  loading,
}) {
  if (loading) return <Skeletons count={8} />;
  return (
    <div className={`gallery-grid ${view}`}>
      {photos.map((p, i) => (
        <PhotoCard
          key={`${p.id}-${i}`}
          photo={p}
          onOpen={onOpen}
          onShare={onShare}
          onCollect={onCollect}
        />
      ))}
    </div>
  );
}
