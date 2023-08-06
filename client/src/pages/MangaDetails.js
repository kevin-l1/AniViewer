import { useEffect, useState } from 'react';
import { fetchManga } from '../lib/api';
import './MangaDetails.css';
import { useParams } from 'react-router-dom';

export default function MangaDetails() {
  const { mal_id } = useParams();
  console.log(mal_id);
  const [manga, setAnime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function loadManga(mal_id) {
      try {
        const manga = await fetchManga(mal_id);
        setAnime(manga);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadManga(mal_id);
  }, [mal_id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {mal_id}: {error.message}
      </div>
    );
  }
  if (!manga) return null;

  const {
    title,
    images,
    synopsis,
    episodes,
    genres,
    type,
    rank,
    score,
    popularity,
  } = manga.data;

  let allGenres = '';
  for (let i = 0; i < genres.length; i++) {
    if (i !== genres.length - 1) {
      allGenres += `${genres[i].name}, `;
    } else {
      allGenres += genres[i].name;
    }
  }

  return (
    <div className="container">
      <div className="col-3">
        <div className="manga-picture-details">
          <img
            className="details-image"
            src={images.jpg.image_url}
            alt={title}
          />
          <div className="manga-details">
            <h3 className="title">{title}</h3>
            <h5 className="type">
              <b>Type:</b> {type}
            </h5>
            <h5 className="episodes">
              <b>Episodes:</b> {episodes}
            </h5>
            <h5 className="genres">
              <b>Genres:</b> {allGenres}
            </h5>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="stats">
          <h1 className="rank">{rank}</h1>
          <h1 className="score">{score}</h1>
          <h1 className="popularity">{popularity}</h1>
        </div>
        <div>
          Synopsis
          {synopsis}
        </div>
      </div>
    </div>
  );
}
