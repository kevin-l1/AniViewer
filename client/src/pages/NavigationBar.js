import './NavigationBar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Account from './Account';
import SearchPage from './AnimeFolder/SearchPage';

export default function NavigationBar(props) {
  const [tempQuery, setTempQuery] = useState();
  const [state, setState] = useState('Anime');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      navigate('/search', { state: { query: tempQuery, buttonState: state } });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleState() {
    state === 'Anime' ? setState('Manga') : setState('Anime');
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="aniviewer-tab">
          AniViewer
        </Link>

        <form onSubmit={handleSubmit}>
          <button type="button" onClick={handleState}>
            {state}
          </button>
          <input
            type="text"
            className="search-bar"
            onChange={(e) => setTempQuery(e.target.value)}></input>
        </form>

        <Link to="/search" className="search-bar">
          <button>Search</button>
        </Link>

        <div className="dropdown">
          <Link to="/animes" className="anime-tab">
            Anime
          </Link>
          <div className="dropdown-items">
            <Link to="/animesSeasonal" className="seasonal-tab">
              Seasonal
            </Link>
            <Link to="/animesPopular" className="popular-tab">
              Popular
            </Link>
            <Link to="/animesTop" className="top-tab">
              Top Rated
            </Link>
          </div>
        </div>

        <div className="dropdown">
          <Link to="/mangas" className="manga-tab">
            Manga
          </Link>
          <div className="dropdown-items">
            <Link to="/mangasPopular" className="popular-tab">
              Popular
            </Link>
            <Link to="/mangasTop" className="top-tab">
              Top Rated
            </Link>
          </div>
        </div>
        <Account />
      </nav>
      <Outlet />
    </div>
  );
}
