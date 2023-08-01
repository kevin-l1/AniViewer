import './Header.css';
import { Link, Outlet } from 'react-router-dom';

export default function Header(props) {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link">
              <Link to="/homepage" className="title">
                Anime
              </Link>
            </li>
            <li className="nav-item nav-link">
              <Link to="/manga" className="title">
                Catalog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
