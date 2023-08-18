// import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';
import { fetchSearch } from '../../lib/api';
import { useLocation } from 'react-router-dom';

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  let query = location.state.query;
  let state = location.state.buttonState;
  console.log(query);

  useEffect(() => {
    async function fetchResponse() {
      try {
        const arrayOfAnimes = await fetchSearch(query, state);
        console.log(arrayOfAnimes);
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

  // async function handleSubmit(event) {
  //   try {
  //     event.preventDefault();
  //     console.log(tempQuery);
  //     setQuery(tempQuery);
  //     console.log(query);
  //     navigate('/session-timed-out');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          onChange={(e) => setTempQuery(e.target.value)}></input>
      </form> */}
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
