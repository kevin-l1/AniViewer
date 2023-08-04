import './MangasPage.css';
import React, { useEffect, useState } from 'react';
import Manga from './Anime';

export default function MangasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [mangas, setMangas] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchResponse() {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/manga?page=${page}&limit=24`
        );
        const arrayOfMangas = await response.json();
        console.log(arrayOfMangas.data);
        setMangas(arrayOfMangas.data);
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
      {mangas.map((manga) => (
        <div key={manga.mal_id}>
          <Manga manga={manga} />
        </div>
      ))}
    </div>
  );
}
