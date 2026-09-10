import { useCallback, useMemo, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toast } from "./components/common";
import Lightbox from "./components/Lightbox";
import CollectionModal from "./components/CollectionModal";
import ShareModal from "./components/ShareModal";
import { useApp } from "./context/AppContext";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Favorites from "./pages/Favorites";
import Collections from "./pages/Collections";
import Wallpapers from "./pages/Wallpapers";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function Shell() {
    const { photos, notice, reload } = useApp(); const [viewer, setViewer] = useState(null), [share, setShare] = useState(null), [collect, setCollect] = useState(null), [toast, setToast] = useState(notice); const loc = useLocation();
    const open = (p) => { const i = photos.findIndex(x => x.id === p.id); setViewer(i < 0 ? 0 : i) };
    const sharePhoto = p => setShare(p);
    const onToast = useCallback(m => setToast(m), []);
    return <>
    <Navbar />
    <div className="ambient-grid" />{notice && <div className="status-banner"><span>{notice}</span>
    <button onClick={reload}>Retry live API</button>
    </div>}
        <Routes>
            <Route path="/" element={<Home onOpen={open} onShare={sharePhoto} onCollect={p => setCollect(p.id)} />} />
                <Route path="/explore" element={<Explore onOpen={open} onShare={sharePhoto} onCollect={p => setCollect(p.id)} />} />
                    <Route path="/favorites" element={<Favorites onOpen={open} onShare={sharePhoto} onCollect={p => setCollect(p.id)} />} />
                        <Route path="/collections" element={<Collections />} /><Route path="/wallpapers" element={<Wallpapers />} />
                        <Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes>
        <footer>
            <div><Link className="brand" to="/">
            <span className="brand-mark">B</span>
            <span>Bharat Ki Jhalak</span>
            </Link>
            <p>Visual stories. India, reframed.</p>
            </div>
            <span>Built with React • Local-first demo architecture</span>
            </footer>
        {viewer !== null && <Lightbox photos={photos} index={viewer} onClose={() => setViewer(null)} onShare={sharePhoto} />}<ShareModal open={!!share} photo={share} onClose={() => setShare(null)} onToast={onToast} /><CollectionModal open={collect !== null} photoId={collect} onClose={() => setCollect(null)} /><Toast message={toast} onClose={() => setToast("")} /></>;
}
export default function App() { return <Shell /> }