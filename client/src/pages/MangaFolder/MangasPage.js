import './MangasPage.css';
import React, { useEffect, useState } from 'react';
import Manga from './Manga';
import { fetchMangas } from '../../lib/api';

export default function MangasPage({ page, setPage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [mangas, setMangas] = useState();
  const [tempOrder, setTempOrder] = useState('popularity');
  const [tempGenreId, setTempGenreId] = useState();
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

  console.log(isLoading);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div className="mangas-container">
      <Modal
        genres={genres}
        order={order}
        genreId={genreId}
        tempOrder={tempOrder}
        tempGenreId={tempGenreId}
        handleOrder={handleOrder}
        handleGenre={handleGenre}
        handleSubmit={handleSubmit}
      />
      <div className="rowOfMangas">
        {mangas.map((manga) => (
          <div key={manga.mal_id} className="manga-container">
            <Manga manga={manga} />
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

function Modal({
  genres,
  order,
  genreId,
  tempOrder,
  tempGenreId,
  handleOrder,
  handleGenre,
  handleSubmit,
}) {
  const orderBy = ['Score', 'Rank', 'Popularity'];

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#filterModal">
        Filter
      </button>

      <div class="modal fade" id="filterModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="row-order-buttons">
                <button
                  type="button"
                  className={
                    tempOrder === 'popularity'
                      ? 'order-button active'
                      : 'order-button'
                  }
                  onClick={() => handleOrder('popularity')}>
                  Popularity
                </button>
                <button
                  type="button"
                  className={
                    tempOrder === 'rank'
                      ? 'order-button active'
                      : 'order-button'
                  }
                  onClick={() => handleOrder('rank')}>
                  Ranking
                </button>
                <button
                  type="button"
                  className={
                    tempOrder === 'score'
                      ? 'order-button active'
                      : 'order-button'
                  }
                  onClick={() => handleOrder('score')}>
                  Score
                </button>
              </div>
              <div className="row-filter-buttons"></div>
              {genres.map((e) => (
                <button
                  type="button"
                  className={
                    tempGenreId === e.id
                      ? 'filter-button active'
                      : 'filter-button'
                  }
                  onClick={() => handleGenre(e.id)}>
                  {e.name}
                </button>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
