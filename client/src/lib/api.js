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

let lastRequest = 0;
function delay(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, millisec);
  });
}

export async function fetchAnimes(page) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?filter=airing&page=${page}&limit=24`
  );
  return await response.json();
}

export async function fetchPopularAnimes(page) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}&limit=24`
  );
  return await response.json();
}

export async function fetchSeasonalAnimes(page) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=24`
  );
  return await response.json();
}

export async function fetchTopAnimes(page) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/top/anime?page=${page}&limit=24`
  );
  return await response.json();
}
