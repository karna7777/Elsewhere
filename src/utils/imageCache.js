const cache = new Map();

const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;

if (!PEXELS_KEY || PEXELS_KEY === 'your_key') {
  console.warn(
    '[Elsewhere] VITE_PEXELS_KEY is missing. Set it in .env — images will use gradient fallbacks.'
  );
}

async function searchPexels(query, perPage) {
  if (!PEXELS_KEY || PEXELS_KEY === 'your_key') return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=${perPage}`,
      { headers: { Authorization: PEXELS_KEY } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.photos ?? [];
  } catch {
    return null;
  }
}

export async function fetchPexelsImage(query, count = 1) {
  const cacheKey = `${query}::${count}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const photos = await searchPexels(query, Math.max(1, count));
  const url = photos?.[0]?.src?.large2x ?? photos?.[0]?.src?.large ?? null;
  if (url) cache.set(cacheKey, url);
  return url;
}

export async function fetchPexelsImages(query, count = 5) {
  const cacheKey = `${query}::multi::${count}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const photos = await searchPexels(query, Math.max(1, count));
  if (!photos?.length) return null;

  const urls = photos
    .slice(0, count)
    .map((p) => p.src?.large2x ?? p.src?.large)
    .filter(Boolean);

  if (urls.length) cache.set(cacheKey, urls);
  return urls.length ? urls : null;
}
