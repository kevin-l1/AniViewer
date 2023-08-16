import './AnimesPage.css';
import React, { useEffect, useState } from 'react';
import Anime from './Anime';
import { fetchAnimes2, fetchAnimesGenres } from '../../lib/api';
import './AnimesPageTest.css';

export default function AnimesPageTest() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [animes, setAnimes] = useState();
  const [page, setPage] = useState(1);
  // const [listOfGenres, setListOfGenres] = useState([]);
  const [tempOrder, setTempOrder] = useState('popularity');
  const [tempGenreId, setTempGenreId] = useState();
  const [order, setOrder] = useState('');
  const [genreId, setGenreId] = useState('');
  const genres = [
    { name: 'Action', id: 1 },
    { name: 'Adventure', id: 2 },
    { name: 'Avant Garde', id: 5 },
    { name: 'Award Winning', id: 46 },
    { name: 'Boys Love', id: 28 },
    { name: 'Comedy', id: 4 },
    { name: 'Drama', id: 8 },
    { name: 'Fantasy', id: 10 },
    { name: 'Girls Love', id: 26 },
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
        const arrayOfAnimes = await fetchAnimes2(page, order, genreId);
        console.log(arrayOfAnimes);
        setAnimes(arrayOfAnimes.data);
        // const allGenres = await fetchAnimesGenres();
        // const arrayOfGenres = allGenres.data.map((e) => ({
        //   name: e.name,
        //   id: e.mal_id,
        // }));
        // const filteredGenres = arrayOfGenres
        //   .map((e) => e)
        //   .filter(
        //     (e) =>
        //       e.name === 'Action' ||
        //       e.name === 'Adventure' ||
        //       e.name === 'Avant Garde' ||
        //       e.name === 'Award Winning' ||
        //       e.name === 'Boys Love' ||
        //       e.name === 'Comedy' ||
        //       e.name === 'Drama' ||
        //       e.name === 'Fantasy' ||
        //       e.name === 'Girls Love' ||
        //       e.name === 'Gourmet' ||
        //       e.name === 'Horror' ||
        //       e.name === 'Mystery' ||
        //       e.name === 'Romance' ||
        //       e.name === 'Sci-Fi' ||
        //       e.name === 'Slice of Life' ||
        //       e.name === 'Sports' ||
        //       e.name === 'Supernatural' ||
        //       e.name === 'Suspense'
        //   );
        // console.log(filteredGenres);
        // setListOfGenres(filteredGenres);
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
    <div className="animes-container">
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
