import Anime from './AnimeFolder/Anime';
import { fetchSearch } from '../lib/api';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  let query = location.state.query;
  let state = location.state.buttonState;

  useEffect(() => {
    async function fetchResponse() {
      try {
        const arrayOfAnimes = await fetchSearch(query, state, page);
        setAnimes(arrayOfAnimes.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResponse();
  }, [page, query]);

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
    <>
      {query ? (
        <div className="animes-container">
          <ul className="rowOfAnimes">
            {animes.map((anime) => (
              <div key={anime.mal_id} className="anime-container">
                <Anime anime={anime} />
              </div>
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
      ) : null}
    </>
  );
}
