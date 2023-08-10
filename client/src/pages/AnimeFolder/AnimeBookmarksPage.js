import { useEffect, useState } from 'react';
import { getAnimeBookmarks } from '../../data';
import { Link } from 'react-router-dom';

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
      <div className="rowOfAnimes">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.mal_id}>
            <AnimeBookmark anime={bookmark} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimeBookmark({ anime }) {
  const { title, imageUrl, itemId } = anime;
  return (
    <Link to={`/animeDetails/${itemId}`}>
      <div className="anime-icon-container">
        <img src={imageUrl} className="d-block" alt={title} />
        <h5 className="anime-title">{title}</h5>
      </div>
    </Link>
  );
}
