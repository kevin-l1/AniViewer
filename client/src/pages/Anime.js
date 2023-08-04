import { Link } from 'react-router-dom';

export default function Anime({ anime }) {
  const { title, images, mal_id } = anime;
  return (
    <Link to={`/details/${mal_id}`}>
      <div className="anime-icon-container">
        <img src={images.jpg.image_url} className="d-block" alt={title} />
        <h5 className="anime-title">{title}</h5>
      </div>
    </Link>
  );
}
