import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';
import { fetchPopularAnimes } from '../../lib/api';

export default function AnimesPopularPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchResponse() {
      try {
        const arrayOfAnimes = await fetchPopularAnimes(page);
        console.log(arrayOfAnimes.data);
        setAnimes(arrayOfAnimes.data);
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
