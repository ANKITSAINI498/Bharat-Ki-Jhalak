import {
  Camera,
  Heart,
  Images,
  Menu,
  Search,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["/explore", "Explore", Images],
    ["/collections", "Collections", Sparkles],
    ["/favorites", "Favorites", Heart],
    ["/wallpapers", "Wallpapers", Camera],
    ["/about", "About", UserRound],
  ];
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <Camera size={19} />
        </span>
        <span>
          BHARAT<span>LENS</span>
        </span>
      </Link>
      <nav className={open ? "nav-links mobile-open" : "nav-links"}>
        {links.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <Link to="/explore" className="icon-btn" aria-label="Search photos">
          <Search size={18} />
        </Link>
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
