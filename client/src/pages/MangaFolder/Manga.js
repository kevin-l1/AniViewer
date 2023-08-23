import { Link } from 'react-router-dom';

export default function Manga({ manga }) {
  const { title, images, mal_id } = manga;
  return (
    <li class="btn-manga" key={mal_id}>
      <Link to={`/mangaDetails/${mal_id}`} className="link">
        <div className="manga-icon-container">
          <img src={images.jpg.image_url} className="d-block" alt={title} />
          <h5 className="manga-title">
            <span className="span-title">{title}</span>
          </h5>
        </div>
      </Link>
    </li>
  );
}
