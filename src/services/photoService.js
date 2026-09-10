const API_URL = import.meta.env.VITE_PHOTO_API_URL || "https://api.unsplash.com";
const API_KEY = import.meta.env.VITE_PHOTO_API_KEY;

const normalizeUnsplash = (p) => ({
  id: String(p.id),
  title: p.alt_description || "Untitled visual story",
  category: "Travel",
  location: p.user?.location || "India & Beyond",
  country: "India",
  photographer: p.user?.name || "Unsplash Creator",
  description: p.description || p.alt_description || "A visual story curated by Bharat Ki Jhalak.",
  image: p.urls?.regular || p.urls?.full,
  thumbnail: p.urls?.small || p.urls?.thumb,
  likes: p.likes || 0,
  views: Math.round((p.likes || 0) * 7.2),
  tags: [p.alt_description, p.user?.name, "photography"].filter(Boolean),
  date: p.created_at || new Date().toISOString(),
  width: p.width || 1600,
  height: p.height || 1067,
  orientation: p.height > p.width ? "Portrait" : p.height === p.width ? "Square" : "Landscape"
});

async function request(url, timeout = 7000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Photo API error: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchPhotos({ page = 1, perPage = 12, query = "India" } = {}) {
  if (!API_KEY) throw new Error("No live API key configured");
  const data = await request(
    `${API_URL}/search/photos?page=${page}&per_page=${perPage}&query=${encodeURIComponent(query)}&orientation=landscape`,
    7000
  );
  return {
    photos: (data.results || []).map(normalizeUnsplash),
    total: data.total || 0
  };
}

export async function searchPhotos(query, options = {}) {
  return fetchPhotos({ ...options, query: query || "India" });
}

export async function fetchPhotoById(id) {
  if (!API_KEY) throw new Error("No live API key configured");
  return normalizeUnsplash(await request(`${API_URL}/photos/${id}`));
}