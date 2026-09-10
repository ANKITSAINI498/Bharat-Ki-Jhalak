import {
  ArrowRight,
  Flame,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useApp } from "../context/AppContext";
import PhotoCard from "../components/PhotoCard";
import { EmptyState, Skeletons } from "../components/common";

export default function Home({ onOpen, onShare, onCollect }) {
  const { photos, loading } = useApp();
  const navigate = useNavigate();

  const trends = [
    "Jaipur",
    "Rajasthan",
    "Nature",
    "Architecture",
    "Food",
    "Travel",
  ];

  const collections = [
    "Royal Rajasthan",
    "Indian Streets",
    "Colors of India",
    "Mountain Stories",
    "Wild India",
  ];

  const featured = photos?.slice(0, 6) || [];
  const heroPhotos = photos?.slice(0, 4) || [];

  // Search submit
  const handleSearch = (event) => {
    event.preventDefault();

    const query = event.currentTarget.elements.q.value.trim();

    if (query) {
      navigate(`/explore?q=${encodeURIComponent(query)}`);
    } else {
      navigate("/explore");
    }
  };

  // Trending search
  const handleTrendClick = (trend) => {
    navigate(`/explore?q=${encodeURIComponent(trend)}`);
  };

  // Collection search
  const handleCollectionClick = (collection) => {
    const words = collection.split(" ");
    const query = words[1] || collection;

    navigate(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-glow one"></div>
        <div className="hero-glow two"></div>

        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14} />
            <span>INDIA / VISUAL DISCOVERY</span>
          </div>

          <h1>
            Visual stories.
            <br />
            <em>India, reframed.</em>
          </h1>

          <p>
            Explore cinematic photography, hidden details and unforgettable
            places through a futuristic digital gallery.
          </p>

          {/* Search */}
          <form className="hero-search" onSubmit={handleSearch}>
            <Search size={20} />

            <input
              type="search"
              name="q"
              placeholder="Search Jaipur, Rajasthan, culture…"
              autoComplete="off"
              aria-label="Search photos"
            />

            <button type="submit">
              Explore
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Trending */}
          <div className="trending">
            <span>Trending</span>

            {trends.map((trend) => (
              <button
                type="button"
                key={trend}
                onClick={() => handleTrendClick(trend)}
              >
                #{trend}
              </button>
            ))}
          </div>
        </div>

      
        <div className="hero-art">
          {heroPhotos.map((photo, index) => (
            <motion.img
              key={photo.id || index}
              src={photo.image}
              style={{
                "--i": index,
              }}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.12,
                duration: 0.6,
                ease: "easeOut",
              }}
              alt={photo.title || "Indian photography"}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <small>EXPLORE NOW</small>

            <h2>
              Trending today
              <Flame size={20} />
            </h2>
          </div>

          <Link className="text-btn" to="/explore">
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="trend-cards">
          {trends.map((trend, index) => (
            <button
              type="button"
              key={trend}
              onClick={() => handleTrendClick(trend)}
              aria-label={`Explore ${trend}`}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <b>{trend}</b>

              <MapPin size={15} />
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <small>CURATED COLLECTIONS</small>

            <h2>Featured Indian stories</h2>
          </div>

          <Link className="text-btn" to="/collections">
            All collections
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="collection-strip">
          {collections.map((collection, index) => (
            <button
              type="button"
              key={collection}
              onClick={() => handleCollectionClick(collection)}
            >
              <span>{collection}</span>

              <small>
                CURATED {String(index + 1).padStart(2, "0")}
              </small>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <small>LIVE GALLERY</small>

            <h2>Latest frames</h2>
          </div>
        </div>

       
        {loading && <Skeletons count={6} />}

       
        {!loading && featured.length > 0 && (
          <div className="gallery-grid masonry">
            {featured.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onOpen={onOpen}
                onShare={onShare}
                onCollect={onCollect}
              />
            ))}
          </div>
        )}

      
        {!loading && featured.length === 0 && (
          <EmptyState
            title="No photos yet"
            text="The curated gallery is currently empty."
          />
        )}
      </section>
    </main>
  );
}

