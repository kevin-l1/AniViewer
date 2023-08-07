import './Homepage.css';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Anime from './AnimeFolder/Anime';

let requestInProcess = false;

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [popularAnimes, setPopularAnimes] = useState();
  const [seasonalAnimes, setSeasonalAnimes] = useState();

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
        const arrayOfPopularAnimes = await response.json();
        setPopularAnimes(arrayOfPopularAnimes.data);
        console.log(arrayOfPopularAnimes.data);

        const response2 = await fetch(
          'https://api.jikan.moe/v4/seasons/now?limit=21'
        );
        const arrayOfSeasonalAnimes = await response2.json();
        setSeasonalAnimes(arrayOfSeasonalAnimes.data);
        console.log(arrayOfSeasonalAnimes.data);
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
  if (
    isLoading ||
    popularAnimes === undefined ||
    seasonalAnimes === undefined
  ) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <p>Error! {error.message}</p>;
  }
  console.log(isLoading);
  console.log(requestInProcess);
  console.log('1', popularAnimes);
  console.log('2', seasonalAnimes);
  return (
    <div className="carouselContainer">
      <div className="animeCarousel">
        <h2 className="seasonal">Seasonal</h2>
        <AnimeCarousel animes={popularAnimes} carouselName="popularAnimes" />
      </div>
      <div className="animeCarousel">
        <h2 className="popular">Most Popular</h2>
        <AnimeCarousel animes={seasonalAnimes} carouselName="seasonalAnimes" />
      </div>
    </div>
  );
}

function AnimeCarousel({ animes, carouselName }) {
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
          <div className="carousel-container">
            {firstAnimeSet.map((anime) => (
              <div key={anime.mal_id}>
                <Anime anime={anime} />
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-container">
            {secondAnimeSet.map((anime) => (
              <div key={anime.mal_id}>
                <Anime anime={anime} />
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-container">
            {thirdAnimeSet.map((anime) => (
              <div key={anime.mal_id}>
                <Anime anime={anime} />
              </div>
            ))}
          </div>
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

// function AnimeCarousel({ animes }) {
//   const firstAnimeSet = [];
//   const secondAnimeSet = [];
//   const thirdAnimeSet = [];
//   for (let i = 0; i < animes.length; i++) {
//     if (i < (animes.length * 1) / 3) {
//       firstAnimeSet.push(animes[i]);
//     } else if (i < (animes.length * 2) / 3) {
//       secondAnimeSet.push(animes[i]);
//     } else {
//       thirdAnimeSet.push(animes[i]);
//     }
//   }

//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item>
//         <div className="carousel-container">
//           {firstAnimeSet.map((anime) => (
//             <div key={anime.mal_id}>
//               <Anime anime={anime} />
//             </div>
//           ))}
//         </div>
//       </Carousel.Item>
//       <Carousel.Item>
//         <div className="carousel-container">
//           {firstAnimeSet.map((anime) => (
//             <div key={anime.mal_id}>
//               <Anime anime={anime} />
//             </div>
//           ))}
//         </div>
//       </Carousel.Item>
//       <Carousel.Item>
//         <div className="carousel-container">
//           {firstAnimeSet.map((anime) => (
//             <div key={anime.mal_id}>
//               <Anime anime={anime} />
//             </div>
//           ))}
//         </div>
//       </Carousel.Item>
//     </Carousel>
//   );
// }
