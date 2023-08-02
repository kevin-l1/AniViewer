import './Homepage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

let requestInProcess = false;

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [topAnimes, setTopAnimes] = useState();
  const [popularAnimes, setPopularAnimes] = useState();

  useEffect(() => {
    async function fetchResponse() {
      try {
        if (requestInProcess) {
          return;
        }
        requestInProcess = true;

        const response = await fetch(
          'https://api.jikan.moe/v4/top/anime?limit=21'
        );
        const arrayOfTopAnimes = await response.json();
        setTopAnimes(arrayOfTopAnimes.data);
        console.log(arrayOfTopAnimes.data);

        const response2 = await fetch(
          'https://api.jikan.moe/v4/seasons/now?limit=21'
        );
        const arrayOfPopularAnimes = await response2.json();
        setPopularAnimes(arrayOfPopularAnimes.data);
        console.log(arrayOfPopularAnimes.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        requestInProcess = false;
      }
    }
    fetchResponse();
  }, []);

  console.log(isLoading);
  if (isLoading || popularAnimes === undefined || topAnimes === undefined) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }
  console.log(isLoading);
  console.log(requestInProcess);
  console.log('1', popularAnimes);
  console.log('2', topAnimes);
  return (
    <div className="carouselContainer">
      <div className="animeCarousel">
        <h2 className="seasonal">Seasonal</h2>
        <Carousel animes={topAnimes} carouselName="topAnimes" />
      </div>
      <div className="animeCarousel">
        <h2 className="popular">Most Popular</h2>
        <Carousel animes={popularAnimes} carouselName="popularAnimes" />
      </div>
    </div>
  );
}

function Carousel({ animes, carouselName }) {
  const firstAnimeSet = [];
  const secondAnimeSet = [];
  const thirdAnimeSet = [];
  for (let i = 0; i < animes.length; i++) {
    if (i < (animes.length * 1) / 3) {
      firstAnimeSet.push(animes[i]);
    } else if (i < (animes.length * 2) / 3) {
      secondAnimeSet.push(animes[i]);
    } else {
      thirdAnimeSet.push(animes[i]);
    }
  }

  return (
    <div id={carouselName} className="carousel slide" data-bs-ride="carousel">
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={'#' + carouselName}
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <div className="carousel-inner">
        <div className="carousel-item active">
          {firstAnimeSet.map((anime) => (
            <div key={anime.mal_id}>
              <Anime anime={anime} />
            </div>
          ))}
        </div>
        <div className="carousel-item">
          {secondAnimeSet.map((anime) => (
            <div key={anime.mal_id}>
              <Anime anime={anime} />
            </div>
          ))}
        </div>
        <div className="carousel-item">
          {thirdAnimeSet.map((anime) => (
            <div key={anime.mal_id}>
              <Anime anime={anime} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={'#' + carouselName}
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

function Anime({ anime }) {
  const { title, images, mal_id } = anime;
  return (
    <Link to={`/animeDetails/${mal_id}`}>
      <div>
        <img src={images.jpg.image_url} className="d-block" alt={title} />
        <h5>{title}</h5>
      </div>
    </Link>
  );
}
