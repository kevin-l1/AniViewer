import { useEffect, useState } from 'react';
import { fetchAnime } from '../lib/api';
import './AnimeDetails.css';

import { Link, useParams } from 'react-router-dom';

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
      <div className="col-4">
        <div>
          <img src={images.jpg.image_url} alt={title} />
          <div className="anime-details">
            <div>{title}</div>
            <div>
              Type: {type}
              Episodes: {episodes}
              Genres: {allGenres}
            </div>
          </div>
          <div>
            {rank}
            {score}
            <h5>{popularity}</h5>
          </div>
          <div>
            Synopsis
            {synopsis}
          </div>
        </div>
      </div>
      <div className="col-8"></div>
    </div>
  );
}
