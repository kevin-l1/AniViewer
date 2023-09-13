//Anime Bookmarks

export async function getAnimeBookmarks() {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/animeBookmarks', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addAnimeBookmark(bookmark) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(bookmark),
  };
  const res = await fetch('/api/animeBookmarks', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteAnimeBookmark(animeId) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/animeBookmarks/${animeId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}

//Manga Bookmarks

export async function getMangaBookmarks() {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/mangaBookmarks', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addMangaBookmark(bookmark) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(bookmark),
  };
  const res = await fetch('/api/mangaBookmarks', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteMangaBookmark(animeId) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/mangaBookmarks/${animeId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}

//Reviews

export async function getAnimeReviews() {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/animeReviews', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function getMangaReviews() {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/mangaReviews', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addReview(review) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(review),
  };
  const res = await fetch('/api/reviews', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function editReview(review) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(review),
  };
  const res = await fetch(`/api/reviews/${review.id}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function deleteReview(animeId) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/reviews/${animeId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
