import './Homepage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomepageCarousel from './Components/HomepageCarousel';

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

        const response2 = await fetch(
          'https://api.jikan.moe/v4/seasons/now?limit=24'
        );
        const arrayOfSeasonalAnimes = await response2.json();
        setSeasonalAnimes(arrayOfSeasonalAnimes.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        requestInProcess = false;
      }
    }
    fetchResponse();
  }, []);

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
      <div className="mobile-popular-container">
        <div className="header">
          <h3 className="popular">Most Popular</h3>
          <Link to="/animes" className="more-link">
            <p className="more">See More...</p>
          </Link>
        </div>
        <div className="popular-animes">
          <MobileAnime anime={popularAnimes[0]} />
          <MobileAnime anime={popularAnimes[1]} />
          <MobileAnime anime={popularAnimes[2]} />
          <div className="extra">
            <MobileAnime anime={popularAnimes[3]} />
          </div>
        </div>
      </div>
      <div className="mobile-seasonal-container">
        <div className="header">
          <h3 className="seasonal">Seasonal</h3>
          <Link to="/animesSeasonal" className="more-link">
            <p className="more">See More...</p>
          </Link>
        </div>
        <div className="seasonal-animes">
          <MobileAnime anime={seasonalAnimes[0]} />
          <MobileAnime anime={seasonalAnimes[1]} />
          <MobileAnime anime={seasonalAnimes[2]} />
          <div className="extra">
            <MobileAnime anime={seasonalAnimes[3]} />
          </div>
        </div>
      </div>

      <div className="anime-carousel">
        <h2 className="popular">Most Popular</h2>
        <HomepageCarousel animes={popularAnimes} />
      </div>
      <div className="anime-carousel">
        <h2 className="seasonal">Seasonal</h2>
        <HomepageCarousel animes={seasonalAnimes} />
      </div>
    </div>
  );
}

function MobileAnime({ anime }) {
  const { title, images, mal_id } = anime;
  return (
    <div class="btn-homepage" key={mal_id}>
      <Link to={`/animeDetails/${mal_id}`} className="link">
        <div className="homepage-icon-container">
          <img
            src={images.jpg.image_url}
            className="mobile-homepage-image"
            alt={title}
          />
          <h5 className="anime-title">
            <span className="span-title">{title}</span>
          </h5>
        </div>
      </Link>
    </div>
  );
}
