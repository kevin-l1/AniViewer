import { useEffect, useState } from 'react';
import { fetchAnime } from '../../lib/api';
import './AnimeDetails.css';
import { useParams } from 'react-router-dom';
import Review from '../Review';

import {
  getAnimeBookmarks,
  addAnimeBookmark,
  deleteAnimeBookmark,
  addReview,
  getReviews,
  editReview,
  deleteReview,
} from '../../data';
import { Link } from 'react-router-dom';

export default function AnimeDetails() {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [bookmarksList, setBookmarksList] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [reviewed, setReviewed] = useState();
  const [reviewsList, setReviewsList] = useState([]);
  const [editing, setEditing] = useState();
  // const [openModal, setOpenModal] = useState();

  useEffect(() => {
    async function loadAnime(mal_id) {
      try {
        const anime = await fetchAnime(mal_id);
        setAnime(anime);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadBookmarks() {
      try {
        const allBookmarks = await getAnimeBookmarks();
        if (allBookmarks) {
          setBookmarksList(allBookmarks);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadReviews() {
      try {
        const allReviews = await getReviews();
        console.log('allReviews:', allReviews);
        if (allReviews) {
          setReviewsList(allReviews);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    loadAnime(mal_id);

    if (sessionStorage.getItem('token')) {
      loadBookmarks();
      loadReviews();
    }
  }, [mal_id, bookmarked, reviewed]);

  function handleBookmark(title, type, images) {
    const bookmark = { title, type, images, mal_id };
    setBookmarked(!bookmarked);

    if (bookmarksList.find((anime) => anime.itemId === Number(mal_id))) {
      handleDeleteBookmark(mal_id);
      return;
    }
    try {
      if (bookmark) {
        addAnimeBookmark(bookmark);
      }
    } catch (err) {
      alert(`User must be logged in`);
    }
  }

  async function handleDeleteBookmark(id) {
    try {
      setIsLoading(true);
      await deleteAnimeBookmark(id);
    } catch (err) {
      alert(`Error deleting bookmark: ${err}`);
    }
  }

  async function handleReview(title, id, imageUrl) {
    const reviewItem = { title, rating, review, imageUrl, id };
    setReviewed(!reviewed);
    try {
      if (!sessionStorage.getItem('token')) {
        throw new Error('User must be logged in');
      }

      if (reviewsList.find((anime) => anime.itemId === Number(mal_id))) {
        handleEditReview(mal_id);
      }
      if (!rating) {
        throw new Error('Rating is required');
      }
      await addReview(reviewItem);
    } catch (err) {
      alert(`${err}`);
    }
  }

  async function handleEditReview(id) {
    const editedReview = { rating, review, id };
    try {
      await editReview(editedReview);
    } catch (err) {
      alert(`Error editing review: ${err}`);
    }
  }

  async function loadEdit() {
    const pastReview = reviewsList.find(
      (anime) => anime.itemId === Number(mal_id)
    );
    setEditing(pastReview.review);
    setRating(pastReview.rating);
    // setOpenModal(!openModal);
  }
  console.log('editing:', editing);

  async function handleDeleteReview(id) {
    try {
      await deleteReview(id);
    } catch (err) {
      alert(`Error deleting review: ${err}`);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await handleReview(title, mal_id, images.jpg.image_url);
  }

  async function handleEditSubmit(event) {
    event.preventDefault();
    await handleEditReview(mal_id);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {mal_id}: {error.message}
      </div>
    );
  }
  if (!anime) return null;

  const {
    title,
    images,
    synopsis,
    episodes,
    genres,
    type,
    rank,
    score,
    popularity,
  } = anime.data;

  let allGenres = '';
  for (let i = 0; i < genres.length; i++) {
    if (i !== genres.length - 1) {
      allGenres += `${genres[i].name}, `;
    } else {
      allGenres += genres[i].name;
    }
  }

  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  console.log('bl:', bookmarksList);
  console.log('rl:', reviewsList);

  return (
    <div className="container">
      <Link to="/" className="return">
        <button type="button" className="return">
          Return
        </button>
      </Link>
      <i
        class={
          bookmarksList.find((anime) => anime.itemId === JSON.parse(mal_id))
            ? 'fa-solid fa-bookmark'
            : 'fa-regular fa-bookmark'
        }
        onClick={() => handleBookmark(title, type, images)}></i>
      <div className="col-3">
        <div className="anime-picture-details">
          <img
            className="details-image"
            src={images.jpg.image_url}
            alt={title}
          />
          <div className="anime-details">
            <h3 className="title">{title}</h3>
            <h5 className="type">
              <b>Type:</b> {type}
            </h5>
            <h5 className="episodes">
              <b>Episodes:</b> {episodes}
            </h5>
            <h5 className="genres">
              <b>Genres:</b> {allGenres}
            </h5>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="stats">
          <div className="rank-container">
            <h3 className="rank-title">Rank</h3>
            <h1 className="rank">{rank}</h1>
          </div>
          <div className="score-container">
            <h3 className="score-title">Score</h3>
            <h1 className="score">{score}</h1>
          </div>
          <div className="popularity-container">
            <h3 className="popularity-title">Popularity</h3>
            <h1 className="popularity">{popularity}</h1>
          </div>
        </div>
        <div className="synopsis-container">
          <h3 className="synopsis-label">Synopsis</h3>
          <p className="synopsis">{synopsis}</p>
        </div>
        <div className="rate-review-row">
          {reviewsList.find((anime) => anime.itemId === JSON.parse(mal_id)) ? (
            <div>
              <button
                type="button"
                className="edit-review-button"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                onClick={loadEdit}>
                Edit Review
              </button>
              <Link to="/reviews">
                <button
                  type="button"
                  className="delete-review-button"
                  onClick={() => handleDeleteReview(mal_id)}>
                  Delete Review
                </button>
              </Link>
            </div>
          ) : (
            <button
              type="button"
              className="leave-review-button"
              data-bs-toggle="modal"
              data-bs-target="#reviewModal">
              Leave Review
            </button>
          )}

          <div class="modal fade" id="reviewModal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={handleSubmit}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Rating
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className="ratings-options">
                      {ratings.map((rating) => (
                        <h1 onClick={() => setRating(rating)}>{rating}</h1>
                      ))}
                    </div>
                    <textarea
                      type="text"
                      className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                      cols="30"
                      rows="10"
                      onChange={(e) => setReview(e.target.value)}
                      required
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss={rating && review ? 'modal' : null}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="modal fade" id="editModal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={handleEditSubmit}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Rating
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className="ratings-options">
                      {ratings.map((rating) => (
                        <h1 className="rate" onClick={() => setRating(rating)}>
                          {rating}
                        </h1>
                      ))}
                    </div>
                    <textarea
                      type="text"
                      className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                      cols="30"
                      rows="10"
                      onChange={(e) => setReview(e.target.value)}
                      required>
                      {editing}
                    </textarea>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss={rating && review ? 'modal' : null}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
