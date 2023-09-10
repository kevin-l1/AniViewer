import '../css/AnimeManga.css';
import { Link } from 'react-router-dom';

export default function Anime({ anime }) {
  const { title, images, mal_id } = anime;
  return (
    <div class="btn-anime" key={mal_id}>
      <Link to={`/animeDetails/${mal_id}`} className="link">
        <div className="anime-icon-container">
          <img src={images.jpg.image_url} className="anime-image" alt={title} />
          <h5 className="anime-title">
            <span className="span-title">{title}</span>
          </h5>
        </div>
      </Link>
    </div>
  );
}
