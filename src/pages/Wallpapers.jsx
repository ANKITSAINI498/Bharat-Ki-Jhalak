import { Download, Monitor, Smartphone } from "lucide-react";
import { useApp } from "../context/AppContext";
export default function Wallpapers() {
 const {photos}=useApp(); const wallpapers=photos.slice(0,10);
 return <main className="page"><div className="page-head"><div><small>WALLPAPER MODE</small><h1>Frames for your screens</h1><p>Curated India-inspired visuals for desktop and mobile displays.</p></div></div><div className="wallpaper-grid">{wallpapers.map(p=><article className="wallpaper-card" key={p.id}><img src={p.image} alt={p.title} loading="lazy"/><div><div><b>{p.title}</b><small>{p.width} × {p.height}</small></div><a href={p.image} target="_blank" rel="noreferrer" download><Download size={16}/></a></div></article>)}</div><div className="wallpaper-note"><Monitor/> Desktop • <Smartphone/> Mobile <span>Download availability depends on the image provider.</span></div></main>;
}