import { Camera, Database, Heart, ShieldCheck, Sparkles } from "lucide-react";
export default function About() {
  return (
    <main className="page about">
      <div className="about-hero">
        <small>ABOUT BHARATLENS</small>
        <h1>India, seen through a different lens.</h1>
        <p>
          BHARATLENS is a portfolio-ready React gallery concept combining Indian
          visual culture with a dark, futuristic SaaS interface.
        </p>
      </div>
      <div className="feature-grid">
        {[
          [
            Camera,
            "Visual discovery",
            "Browse stories across cities, landscapes, culture, food and wildlife.",
          ],
          [
            Database,
            "API + fallback",
            "A dedicated service layer supports a live photo API with curated local JSON fallback.",
          ],
          [
            Heart,
            "Local-first",
            "Favorites, likes, collections and view preferences persist in your browser.",
          ],
          [
            ShieldCheck,
            "Robust UX",
            "Error states, accessible controls, lazy images and safe storage keep the experience resilient.",
          ],
          [
            Sparkles,
            "Premium motion",
            "Subtle glass, gradients and motion create depth without turning the interface into a distraction.",
          ],
        ].map(([I, t, d]) => (
          <div className="feature-card" key={t}>
            <I />
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
