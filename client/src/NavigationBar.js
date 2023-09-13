import './pages/css/NavigationBar.css';
import SearchBar from './pages/Components/SearchBar';
import Account from './Account';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function NavigationBar({ setSignedIn }) {
  const [tempQuery, setTempQuery] = useState();
  const [state, setState] = useState('Anime');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      navigate('/search', {
        state: { query: tempQuery, buttonState: state },
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleState() {
    state === 'Anime' ? setState('Manga') : setState('Anime');
  }

  return (
    <div>
      <div className="aniviewer-row">
        <Link to="/">
          <h1 className="aniviewer-main-tab">AniViewer</h1>
        </Link>
      </div>
      <div>
        <nav className="navigation-bar">
          <Link to="/" className="aniviewer-tab">
            AniViewer
          </Link>
          <form className="nav-search" onSubmit={handleSubmit}>
            <button
              type="button"
              className="tab-switcher"
              onClick={handleState}>
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
          </div>
          <SearchBar />
          <Account setSignedIn={setSignedIn} />
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
