import './Homepage.css';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Anime from './AnimeFolder/Anime';
import BootstrapCarousel from './Carousel';

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
          'https://api.jikan.moe/v4/top/anime?limit=24'
        );
        const arrayOfPopularAnimes = await response.json();
        setPopularAnimes(arrayOfPopularAnimes.data);
        console.log(arrayOfPopularAnimes.data);

        const response2 = await fetch(
          'https://api.jikan.moe/v4/seasons/now?limit=24'
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

  return (
    <div className="homepage-carousel">
      <div className="anime-carousel">
        <h2 className="popular">Most Popular</h2>
        <BootstrapCarousel animes={popularAnimes} />
      </div>
      <div className="anime-carousel">
        <h2 className="seasonal">Seasonal</h2>
        <BootstrapCarousel animes={seasonalAnimes} />
      </div>
    </div>
  );
}
