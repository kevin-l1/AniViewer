import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';

export default function AnimesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchResponse() {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/anime?page=${page}&limit=24`
        );
        const arrayOfAnimes = await response.json();
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

  console.log(isLoading);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div className="container">
      {animes.map((anime) => (
        <div key={anime.mal_id}>
          <Anime anime={anime} />
        </div>
      ))}
    </div>
  );
}
