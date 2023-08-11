import { useEffect, useState } from 'react';
import { getMangaBookmarks } from '../../data';
import { Link } from 'react-router-dom';
import './MangaBookmarksPage.css';

export default function MangaBookmarksPage({ onCreate, onEdit }) {
  const [isLoading, setIsLoading] = useState();
  const [bookmarks, setBookmarks] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const bookmarks = await getMangaBookmarks();
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
    <div className="mangas-container">
      <h1 className="manga-bookmarks-title">Manga Bookmarks</h1>
      <div className="rowOfMangas">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.mal_id} className="manga-container">
            <MangaBookmark manga={bookmark} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MangaBookmark({ manga }) {
  const { title, imageUrl, itemId } = manga;
  return (
    <Link to={`/mangaDetails/${itemId}`}>
      <div className="manga-icon-container">
        <img src={imageUrl} className="d-block" alt={title} />
        <h5 className="manga-title">{title}</h5>
      </div>
    </Link>
  );
}
