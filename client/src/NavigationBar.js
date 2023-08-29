import './css/NavigationBar.css';
import SearchBar from './SearchBar';
import { Link, Outlet } from 'react-router-dom';
import Account from './Account';

export default function NavigationBar(props) {
  return (
    <div>
      <nav className="navigation-bar">
        <Link to="/" className="aniviewer-tab">
          AniViewer
        </Link>
        <SearchBar />
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
