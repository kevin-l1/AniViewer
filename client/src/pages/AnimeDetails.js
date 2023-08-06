import { useEffect, useState } from 'react';
import { fetchAnime } from '../lib/api';
import './AnimeDetails.css';

import { useParams } from 'react-router-dom';

export default function AnimeDetails() {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function loadAnime(mal_id) {
      try {
        const anime = await fetchAnime(mal_id);
        setAnime(anime);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadAnime(mal_id);
  }, [mal_id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {mal_id}: {error.message}
      </div>
    );
  }
  if (!anime) return null;

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
  } = anime.data;

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
        <div className="anime-picture-details">
          <img
            className="details-image"
            src={images.jpg.image_url}
            alt={title}
          />
          <div className="anime-details">
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
