import { Link } from 'react-router-dom';

export default function Manga({ manga }) {
  const { title, images, mal_id } = manga;
  return (
    <Link to={`/mangaDetails/${mal_id}`}>
      <div className="manga-icon-container">
        <img src={images.jpg.image_url} className="d-block" alt={title} />
        <h5 className="manga-title">{title}</h5>
      </div>
    </Link>
  );
}