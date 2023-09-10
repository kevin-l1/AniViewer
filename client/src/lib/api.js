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

export async function fetchAnimes(page, order, genreId) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?sfw&page=${page}&order_by=${
      order ? order : 'popularity'
    }&limit=25&genres=${genreId}`
  );
  return await response.json();
}

export async function fetchSeasonalAnimes(page, filterId) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/seasons/now?sfw&page=${page}&genres=${filterId}`
  );
  return await response.json();
}

export async function fetchMangas(page, order, genreId) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/manga?sfw&page=${page}&order_by=${
      order ? order : 'popularity'
    }&limit=25&genres=${genreId}`
  );
  return await response.json();
}

export async function fetchSearch(query, state, page) {
  if (Date.now() - lastRequest < 500) {
    await delay(500);
  }
  lastRequest = Date.now();
  const response = await fetch(
    `https://api.jikan.moe/v4/${state.toLowerCase()}?sfw&q=${query}&page=${page}`
  );
  return await response.json();
}
