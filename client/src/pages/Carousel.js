import Carousel from 'react-bootstrap/Carousel';
import Anime from './AnimeFolder/Anime';
import { Link } from 'react-router-dom';

export default function BootstrapCarousel({ animes }) {
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
    <Carousel>
      <Carousel.Item>
        <div className="carousel-container">
          {firstAnimeSet.map((anime) => (
            <div key={anime.mal_id} className="carousel-anime">
              <CarouselAnime anime={anime} />
            </div>
          ))}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-container">
          {secondAnimeSet.map((anime) => (
            <div key={anime.mal_id} className="carousel-anime">
              <CarouselAnime anime={anime} />
            </div>
          ))}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-container">
          {thirdAnimeSet.map((anime) => (
            <div key={anime.mal_id} className="carousel-anime">
              <CarouselAnime anime={anime} />
            </div>
          ))}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

function CarouselAnime({ anime }) {
  const { title, images, mal_id } = anime;
  return (
    <Link to={`/animeDetails/${mal_id}`}>
      <div className="carousel-anime-and-title">
        <img src={images.jpg.image_url} className="anime-image" alt={title} />
        <h5 className="anime-title">{title}</h5>
      </div>
    </Link>
  );
}