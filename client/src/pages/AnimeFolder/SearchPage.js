// import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';
import { fetchSearch } from '../../lib/api';

export default function AnimesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState();
  const [page, setPage] = useState(1);
  const [tempQuery, setTempQuery] = useState();
  const [query, setQuery] = useState();

  useEffect(() => {
    async function fetchResponse() {
      try {
        if (query) {
          const arrayOfAnimes = await fetchSearch(query);
          console.log(arrayOfAnimes);
          setAnimes(arrayOfAnimes.data);
        }
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

  function handleSubmit(event) {
    event.preventDefault();
    console.log(tempQuery);
    setQuery(tempQuery);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          onChange={(e) => setTempQuery(e.target.value)}></input>
      </form>
      {query ? (
        <div className="animes-container">
          <div className="rowOfAnimes">
            {animes.map((anime) => (
              <div key={anime.mal_id}>
                <Anime anime={anime} />
              </div>
            ))}
          </div>
          {page > 1 ? (
            <div>
              <button onClick={handlePrev}>Previous Page</button>
              <button onClick={handleNext}>Next Page</button>
            </div>
          ) : (
            <button onClick={handleNext}>Next Page</button>
          )}
        </div>
      ) : null}
    </>
  );
}
