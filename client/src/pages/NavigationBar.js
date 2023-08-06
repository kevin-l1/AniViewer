import './NavigationBar.css';
import { Link, Outlet } from 'react-router-dom';

export default function NavigationBar(props) {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-collapse">
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
              <Link to="/animes" className="anime-tab">
                Anime
              </Link>
            </li>
            <li className="nav-item nav-link">
              <Link to="/mangas" className="manga-tab">
                Manga
              </Link>
            </li>
            <li className="nav-item nav-link">
              <Link to="/createAccount" className="account-tab">
                Icon
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
