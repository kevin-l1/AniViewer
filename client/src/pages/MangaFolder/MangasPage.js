import '../css/AnimeManga.css';
import React, { useEffect, useState } from 'react';
import Manga from './Manga';
import { fetchMangas } from '../../lib/api';
import Filter from '../Components/Filter';

export default function MangasPage({ page, setPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [mangas, setMangas] = useState();
  const [tempOrder, setTempOrder] = useState('popularity');
  const [tempGenreId, setTempGenreId] = useState('');
  const [order, setOrder] = useState('');
  const [genreId, setGenreId] = useState('');
  const genres = [
    { name: 'Action', id: 1 },
    { name: 'Adventure', id: 2 },
    { name: 'Avant Garde', id: 5 },
    { name: 'Award Winning', id: 46 },
    { name: 'Comedy', id: 4 },
    { name: 'Drama', id: 8 },
    { name: 'Fantasy', id: 10 },
    { name: 'Gourmet', id: 47 },
    { name: 'Horror', id: 14 },
    { name: 'Mystery', id: 7 },
    { name: 'Romance', id: 22 },
    { name: 'Sci-Fi', id: 24 },
    { name: 'Slice of Life', id: 36 },
    { name: 'Sports', id: 30 },
    { name: 'Supernatural', id: 37 },
    { name: 'Suspense', id: 41 },
  ];

  useEffect(() => {
    async function fetchResponse() {
      try {
        const arrayOfMangas = await fetchMangas(page, order, genreId);
        setMangas(arrayOfMangas.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResponse();
  }, [page, order, genreId]);

  function handleNext() {
    setPage(page + 1);
  }

  function handlePrev() {
    setPage(page - 1);
  }

  function handleOrder(order) {
    setTempOrder(order);
  }

  function handleGenre(genreId) {
    genreId === tempGenreId ? setTempGenreId('') : setTempGenreId(genreId);
  }

  function handleSubmit() {
    setOrder(tempOrder);
    setGenreId(tempGenreId);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div className="mangas-container">
      <div className="filter-container">
        <Filter
          genres={genres}
          order={order}
          genreId={genreId}
          tempOrder={tempOrder}
          tempGenreId={tempGenreId}
          handleOrder={handleOrder}
          handleGenre={handleGenre}
          handleSubmit={handleSubmit}
        />
      </div>

      <ul className="rowOfMangas">
        {mangas.map((manga) => (
          <li key={manga.mal_id} className="manga-container">
            <Manga manga={manga} />
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
