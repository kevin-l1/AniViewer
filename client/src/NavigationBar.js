import './NavigationBar.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Account from './Account';

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

        <form className="nav-search" onSubmit={handleSubmit}>
          <button type="button" className="tab-switcher" onClick={handleState}>
            {state}
          </button>
          <input
            type="text"
            className="search-bar"
            onChange={(e) => setTempQuery(e.target.value)}></input>
        </form>

        <div className="anime-dropdown">
          <Link to="/animes" className="anime-tab">
            Anime
          </Link>
          <div className="anime-dropdown-items">
            <Link to="/animesSeasonal" className="seasonal-tab">
              Seasonal
            </Link>
          </div>
        </div>

        <div className="manga-dropdown">
          <Link to="/mangas" className="manga-tab">
            Manga
          </Link>
          <div className="manga-dropdown-items">
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
