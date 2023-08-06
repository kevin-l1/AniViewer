export async function fetchAnime(mal_id) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}/full`);
  console.log(res);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchManga(mal_id) {
  const res = await fetch(`https://api.jikan.moe/v4/manga/${mal_id}/full`);
  console.log(res);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
