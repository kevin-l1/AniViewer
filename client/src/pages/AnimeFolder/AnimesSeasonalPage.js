import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';
import { fetchSeasonalAnimes } from '../../lib/api';

export default function AnimesSeasonalPage({ page, setPage, state, setState }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState();

  useEffect(() => {
    async function fetchResponse() {
      try {
        const arrayOfAnimes = await fetchSeasonalAnimes(page);
        setAnimes(arrayOfAnimes.data);
        setState('seasonalAnimePage');
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResponse();
  }, [page]);

  function handleNext() {
    setPage(() => page + 1);
  }

  function handlePrev() {
    setPage(() => page - 1);
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
      <ul className="rowOfAnimes">
        {animes.map((anime) => (
          <li key={anime.mal_id} className="anime-container">
            <Anime anime={anime} />
          </li>
        ))}
      </ul>
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
