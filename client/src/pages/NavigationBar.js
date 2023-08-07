import './NavigationBar.css';
import { Link, Outlet } from 'react-router-dom';
import SignIn from './SignIn';
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
              <SignIn />
              <div className="dropdown-items">
                <Link to="/mangas" className="manga-tab">
                  Bookmarks
                </Link>
                <Link to="/mangas" className="manga-tab">
                  Reviews
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
