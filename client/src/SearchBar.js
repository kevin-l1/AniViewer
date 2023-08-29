import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
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
    <>
      <form className="nav-search" onSubmit={handleSubmit}>
        <button type="button" className="tab-switcher" onClick={handleState}>
          {state}
        </button>
        <input
          type="text"
          className="search-bar"
          onChange={(e) => setTempQuery(e.target.value)}></input>
      </form>

      <i
        className="fa fa-search"
        data-bs-toggle="modal"
        data-bs-target="#searchModal"></i>
      <div
        className="search modal fade"
        id="searchModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="searchModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
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
          </div>
        </div>
      </div>
    </>
  );
}
