import { useEffect, useState } from 'react';
import { getAnimeBookmarks } from '../../data';
import { Link } from 'react-router-dom';
import './AnimeBookmarksPage.css';

export default function AnimeBookmarksPage({ onCreate, onEdit }) {
  const [isLoading, setIsLoading] = useState();
  const [bookmarks, setBookmarks] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const bookmarks = await getAnimeBookmarks();
        console.log(bookmarks);
        setBookmarks(bookmarks);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookmarks: {error.message}</div>;
  if (!bookmarks) return null;

  return (
    <div className="animes-container">
      <h1 className="anime-bookmarks-title">Anime Bookmarks</h1>
      <ul className="rowOfAnimes">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.mal_id} className="anime-container">
            <AnimeBookmark anime={bookmark} />
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
