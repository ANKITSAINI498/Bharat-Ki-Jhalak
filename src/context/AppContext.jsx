import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPhotos } from "../services/photoService";
import { readStore, writeStore } from "../utils/storage";

const AppContext = createContext(null);

const KEYS = {
  favorites: "Bharat Ki Jhalak_favorites",
  liked: "Bharat Ki Jhalak_liked",
  collections: "Bharat Ki Jhalak_collections",
  view: "Bharat Ki Jhalak_view",
};

export function AppProvider({ children }) {
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    readStore(KEYS.favorites, []),
  );
  const [liked, setLiked] = useState(() => readStore(KEYS.liked, []));
  const [collections, setCollections] = useState(() =>
    readStore(KEYS.collections, []),
  );
  const [viewMode, setViewMode] = useState(() =>
    readStore(KEYS.view, "masonry"),
  );
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [hasLiveApi, setHasLiveApi] = useState(false);

  useEffect(() => {
    writeStore(KEYS.favorites, favorites);
    writeStore(KEYS.liked, liked);
    writeStore(KEYS.collections, collections);
    writeStore(KEYS.view, viewMode);
  }, [favorites, liked, collections, viewMode]);

  const loadInitial = async () => {
    setLoading(true);
    try {
      const live = await fetchPhotos({
        page: 1,
        perPage: 24,
        query: "India photography",
      });
      if (!live.photos.length) throw new Error("Empty live response");
      setPhotos(live.photos);
      setHasLiveApi(true);
      setNotice("");
    } catch {
      try {
        const response = await fetch("/data/photos.json");
        if (!response.ok) throw new Error("Fallback unavailable");
        const data = await response.json();
        setPhotos(data.photos || []);
        setHasLiveApi(false);
        setNotice("Live photos unavailable. Showing curated gallery.");
      } catch {
        setPhotos([]);
        setNotice("Unable to load live photos or curated gallery.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);

  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              likes: Math.max(0, p.likes + (liked.includes(id) ? -1 : 1)),
            }
          : p,
      ),
    );
  };

  const createCollection = (name) => {
    const clean = name.trim();
    if (!clean) return false;
    setCollections((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: clean,
        photoIds: [],
        createdAt: Date.now(),
      },
    ]);
    return true;
  };

  const addToCollection = (collectionId, photoId) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId && !c.photoIds.includes(photoId)
          ? { ...c, photoIds: [...c.photoIds, photoId] }
          : c,
      ),
    );
  };

  const removeFromCollection = (collectionId, photoId) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, photoIds: c.photoIds.filter((id) => id !== photoId) }
          : c,
      ),
    );
  };

  const deleteCollection = (collectionId) =>
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));

  const value = useMemo(
    () => ({
      photos,
      setPhotos,
      favorites,
      liked,
      collections,
      viewMode,
      setViewMode,
      loading,
      notice,
      hasLiveApi,
      reload: loadInitial,
      toggleFavorite,
      toggleLike,
      createCollection,
      addToCollection,
      removeFromCollection,
      deleteCollection,
    }),
    [
      photos,
      favorites,
      liked,
      collections,
      viewMode,
      loading,
      notice,
      hasLiveApi,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
