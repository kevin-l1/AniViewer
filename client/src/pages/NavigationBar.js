import './NavigationBar.css';
import { Link, Outlet } from 'react-router-dom';
import Account from './Account';
import CreateAccount from './CreateAccount';

export default function NavigationBar(props) {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="aniviewer-tab">
          AniViewer
        </Link>

        <Link to="/animes/:random" className="search-bar">
          <button>Anime</button>
          <input type="text" className="search"></input>
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

        <div className="dropdown">
          <Account />
          {sessionStorage.getItem('token') ? (
            <div className="dropdown-items">
              <Link to="/animeBookmarks" className="bookmarks-tab">
                Anime Bookmarks
              </Link>
              <Link to="/mangaBookmarks" className="bookmarks-tab">
                Manga Bookmarks
              </Link>
              <Link to="/reviews" className="reviews-tab">
                Reviews
              </Link>
              <div className="sign-out-tab">Sign Out</div>
            </div>
          ) : null}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
