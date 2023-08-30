import { useEffect, useState } from 'react';
import { getAnimeBookmarks, getMangaBookmarks } from '../data';
import { Link } from 'react-router-dom';
import './AnimeFolder/AnimeBookmarksPage.css';

export default function BookmarksPage({ onCreate, onEdit }) {
  const [isLoading, setIsLoading] = useState();
  const [animeBookmarks, setAnimeBookmarks] = useState();
  const [mangaBookmarks, setMangaBookmarks] = useState();
  const [state, setState] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const animeBookmarks = await getAnimeBookmarks();
        const mangaBookmarks = await getMangaBookmarks();
        setAnimeBookmarks(animeBookmarks);
        setMangaBookmarks(mangaBookmarks);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading, state]);

  function handleAnime() {
    state !== 'Anime' ? setState('Anime') : setState('');
    console.log(state);
  }

  function handleManga() {
    state !== 'Manga' ? setState('Manga') : setState('');
    console.log(state);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookmarks: {error.message}</div>;
  if (!animeBookmarks) return null;
  if (!mangaBookmarks) return null;

  return (
    <div className="animes-container">
      <h1 className="anime-bookmarks-title">Bookmarks</h1>
      <div className="filter-states">
        <button type="button" className="filter-anime" onClick={handleAnime}>
          Anime
        </button>
        <button type="button" className="filter-manga" onClick={handleManga}>
          Manga
        </button>
      </div>
      <ul className="rowOfAnimes">
        {state === 'Manga'
          ? null
          : animeBookmarks.map((bookmark) => (
              <div key={bookmark.mal_id} className="anime-container">
                <AnimeBookmark anime={bookmark} />
              </div>
            ))}
        {state === 'Anime'
          ? null
          : mangaBookmarks.map((bookmark) => (
              <div key={bookmark.mal_id} className="anime-container">
                <MangaBookmark manga={bookmark} />
              </div>
            ))}
      </ul>
    </div>
  );
}

function AnimeBookmark({ anime }) {
  const { title, imageUrl, itemId } = anime;
  return (
    <li class="btn-anime" key={itemId}>
      <Link to={`/animeDetails/${itemId}`} className="link">
        <div className="anime-icon-container">
          <img src={imageUrl} className="anime-image" alt={title} />
          <h5 className="anime-title">
            <span className="span-title">{title}</span>
          </h5>
        </div>
      </Link>
    </li>
  );
}

function MangaBookmark({ manga }) {
  const { title, imageUrl, itemId } = manga;
  return (
    <li class="btn-manga" key={itemId}>
      <Link to={`/mangaDetails/${itemId}`} className="link">
        <div className="anime-icon-container">
          <img src={imageUrl} className="manga-image" alt={title} />
          <h5 className="anime-title">
            <span className="span-title">{title}</span>
          </h5>
        </div>
      </Link>
    </li>
  );
}
