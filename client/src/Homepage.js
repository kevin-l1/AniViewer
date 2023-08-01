import './Homepage.css';
import React, { useEffect, useState } from 'react';

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [topAnimes, setTopAnimes] = useState();
  const [popularAnimes, setPopularAnimes] = useState();

  useEffect(() => {
    async function fetchResponse() {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        const result = await response.json();

        const allTopAnimes = result.data.map((e) => e);
        const arrayOfTopAnimes = allTopAnimes.slice(0, 21);
        setTopAnimes(arrayOfTopAnimes);
        console.log(arrayOfTopAnimes);

        const allPopularAnimes = result.data.map((e) => e);
        const arrayOfPopularAnimes = allPopularAnimes.sort(
          (a, b) => a.popularity - b.popularity
        );
        // arrayOfPopularAnimes.sort((a, b) => (a.popularity - b.popularity))
        setPopularAnimes(arrayOfPopularAnimes.slice(0, 21));
        console.log(arrayOfPopularAnimes);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    // async function fetchResponse() {
    //   try {
    //     const response = await fetch(
    //       'https://api.jikan.moe/v4/top/anime?limit=21'
    //     );
    //     const arrayOfTopAnimes = await response.json();
    //     setTopAnimes(arrayOfTopAnimes.data);
    //     console.log(arrayOfTopAnimes.data)

    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    //     async function fetchResponse2() {
    //   try {

    //     const response2 = await fetch(
    //       'https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=21'
    //     );
    //     const arrayOfPopularAnimes = await response2.json();
    //     setPopularAnimes(arrayOfPopularAnimes.data);

    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchResponse();
    // fetchResponse2()
    fetchResponse();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }
  return (
    <div class="container">
      <div class="animeCarousel">
        <h2 className="seasonal">Seasonal</h2>
        <Carousel animes={topAnimes} carouselName="topAnimes" />
      </div>
      <div class="animeCarousel">
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
    <div id={carouselName} class="carousel slide" data-bs-ride="carousel">
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target={'#' + carouselName}
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <div class="carousel-inner">
        <div class="carousel-item active">
          {firstAnimeSet.map((anime) => (
            <div>
              <img
                src={anime.images.jpg.image_url}
                class="d-block w-100"
                alt={anime.title_english}
              />
              <h5>{anime.english_title}</h5>{' '}
            </div>
          ))}
        </div>
        <div class="carousel-item">
          {secondAnimeSet.map((anime) => (
            <div>
              <img
                src={anime.images.jpg.image_url}
                class="d-block w-100"
                alt={anime.title_english}
              />
              <h5>{anime.english_title}</h5>{' '}
            </div>
          ))}
        </div>
        <div class="carousel-item">
          {thirdAnimeSet.map((anime) => (
            <div>
              <img
                src={anime.images.jpg.image_url}
                class="d-block w-100"
                alt={anime.title_english}
              />
              <h5>{anime.english_title}</h5>
            </div>
          ))}
        </div>
      </div>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target={'#' + carouselName}
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
