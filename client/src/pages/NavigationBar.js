import './NavigationBar.css';
import { Link, Outlet } from 'react-router-dom';
import Account from './Account';
import CreateAccount from './CreateAccount';

export default function NavigationBar(props) {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-link">
            <Link to="/" className="aniviewer-tab">
              AniViewer
            </Link>
          </li>
          <li className="nav-item nav-link">
            <input type="text"></input>
          </li>
          <li className="nav-item nav-link">
            <div className="dropdown">
              <Link to="/animes" className="manga-tab">
                Anime
              </Link>
              <div className="dropdown-items">
                <Link to="/animesSeasonal" className="anime-tab">
                  Seasonal
                </Link>
                <Link to="/animesPopular" className="anime-tab">
                  Popular
                </Link>
                <Link to="/animesTop" className="anime-tab">
                  Top Rated
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item nav-link">
            <div className="dropdown">
              <Link to="/mangas" className="manga-tab">
                Manga
              </Link>
              <div className="dropdown-items">
                <Link to="/mangasPopular" className="manga-tab">
                  Popular
                </Link>
                <Link to="/mangasTop" className="manga-tab">
                  Top Rated
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item nav-link">
            <div className="dropdown">
              <Account />
              {sessionStorage.getItem('token') ? (
                <div className="dropdown-items">
                  <Link to="/animeBookmarks" className="manga-tab">
                    Anime Bookmarks
                  </Link>
                  <Link to="/mangaBookmarks" className="manga-tab">
                    Manga Bookmarks
                  </Link>
                  <Link to="/reviews" className="manga-tab">
                    Reviews
                  </Link>
                  <div>Sign Out</div>
                </div>
              ) : null}
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
