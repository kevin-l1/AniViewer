import '../css/Filter.css';

export default function Filter({
  genres,
  order,
  genreId,
  tempOrder,
  tempGenreId,
  handleOrder,
  handleGenre,
  handleSubmit,
}) {
  return (
    <>
      <button
        type="button"
        class="filter"
        data-bs-toggle="modal"
        data-bs-target="#filterModal">
        Filter
      </button>

      <div class="modal fade" id="filterModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="filter-label">Filter</h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="row-order-buttons">
                <button
                  type="button"
                  className={
                    tempOrder === 'popularity'
                      ? 'order-button active'
                      : 'order-button'
                  }
                  onClick={() => handleOrder('popularity')}>
                  Popularity
                </button>
                <button
                  type="button"
                  className={
                    tempOrder === 'rank'
                      ? 'order-button active'
                      : 'order-button'
                  }
                  onClick={() => handleOrder('rank')}>
                  Ranking
                </button>
                <button
                  type="button"
                  className={
                    tempOrder === 'score'
                      ? 'order-button active'
                      : 'order-button'
                  }
                  onClick={() => handleOrder('score')}>
                  Score
                </button>
              </div>
              <div className="row-filter-buttons">
                {genres.map((e) => (
                  <button
                    type="button"
                    className={
                      tempGenreId === e.id
                        ? 'filter-button active'
                        : 'filter-button'
                    }
                    onClick={() => handleGenre(e.id)}>
                    {e.name}
                  </button>
                ))}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                style={{
                  background: '#758cff',
                  color: 'white',
                  border: '2px solid black',
                  width: '8rem',
                  'font-size': '1.8rem',
                }}
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
