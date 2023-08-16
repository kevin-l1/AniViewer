import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';
import { fetchAnimes, fetchAnimesGenres } from '../../lib/api';

export default function AnimesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchResponse() {
      try {
        const arrayOfAnimes = await fetchAnimes(page, filter);
        setAnimes(arrayOfAnimes.data);

        const allGenres = await fetchAnimesGenres();
        const arrayOfGenres = allGenres.data.map((e) => ({
          name: e.name,
          id: e.mal_id,
        }));
        const filtered = arrayOfGenres
          .map((e) => e)
          .filter(
            (e) =>
              e.name === 'Action' ||
              e.name === 'Adventure' ||
              e.name === 'Avant Garde' ||
              e.name === 'Award Winning' ||
              e.name === 'Boys Love' ||
              e.name === 'Comedy' ||
              e.name === 'Drama' ||
              e.name === 'Fantasy' ||
              e.name === 'Girls Love' ||
              e.name === 'Gourmet' ||
              e.name === 'Horror' ||
              e.name === 'Mystery' ||
              e.name === 'Romance' ||
              e.name === 'Sci-Fi' ||
              e.name === 'Slice of Life' ||
              e.name === 'Sports' ||
              e.name === 'Supernatural' ||
              e.name === 'Suspense'
          );
        console.log(arrayOfGenres);
        console.log(filtered);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResponse();
  }, [page]);

  function handleNext() {
    setPage(page + 1);
  }

  function handlePrev() {
    setPage(page - 1);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div className="animes-container">
      <button className="filter">Filter</button>
      <div className="rowOfAnimes">
        {animes.map((anime) => (
          <div key={anime.mal_id} className="anime-container">
            <Anime anime={anime} />
          </div>
        ))}
      </div>
      {page > 1 ? (
        <div className="next-prev-buttons">
          <button className="prev-button" onClick={handlePrev}>
            Previous Page
          </button>
          <button className="next-button" onClick={handleNext}>
            Next Page
          </button>
        </div>
      ) : (
        <div className="single-button-row">
          <button className="single-button" onClick={handleNext}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}
