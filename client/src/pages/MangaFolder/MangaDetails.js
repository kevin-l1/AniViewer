import { useEffect, useState } from 'react';
import { fetchManga } from '../../lib/api';
import {
  getMangaBookmarks,
  addMangaBookmark,
  deleteMangaBookmark,
  addReview,
} from '../../data';
import './MangaDetails.css';
import { useParams } from 'react-router-dom';

export default function MangaDetails() {
  const { mal_id } = useParams();
  const [manga, setManga] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [bookmarksList, setBookmarksList] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [pastReview, setPastReview] = useState();
  const [reviewsList, setReviewsList] = useState([]);
  const [editing, setEditing] = useState();

  useEffect(() => {
    async function loadManga(mal_id) {
      try {
        const manga = await fetchManga(mal_id);
        setManga(manga);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadBookmarks() {
      try {
        const allBookmarks = await getMangaBookmarks();
        console.log(allBookmarks);
        if (allBookmarks) {
          setBookmarksList(allBookmarks);
          console.log(bookmarksList);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    // async function loadReviews() {
    //   try {
    //     const allReviews = await getReviews();
    //     if (allReviews) {
    //       setReviewsList(allReviews);
    //     }
    //   } catch (err) {
    //     setError(err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    setIsLoading(true);
    loadManga(mal_id);

    if (sessionStorage.getItem('token')) {
      loadBookmarks();
    }
  }, [mal_id, bookmarked]);

  function handleBookmark(title, type, images) {
    const bookmark = { title, type, images, mal_id };
    setBookmarked(!bookmarked);

    if (bookmarksList.find((manga) => manga.itemId === JSON.parse(mal_id))) {
      handleDeleteBookmark(mal_id);
      return;
    }
    try {
      if (bookmark) {
        addMangaBookmark(bookmark);
      }
    } catch (err) {
      alert(`User must be logged in`);
    }
  }

  async function handleDeleteBookmark(id) {
    try {
      setIsLoading(true);
      await deleteMangaBookmark(id);
    } catch (err) {
      alert(`Error deleting bookmark: ${err}`);
    }
    // setIsLoading(false)
  }

  async function handleReview(title, id, imageUrl) {
    const reviewItem = { title, rating, review, imageUrl, id };
    try {
      if (!sessionStorage.getItem('token')) {
        throw new Error('User must be logged in');
      }
      if (!rating) {
        throw new Error('Rating is required');
      }
      await addReview(reviewItem);
    } catch (err) {
      alert(`${err}`);
    }
  }

  // async function handleDeleteReview(id) {
  //   try {
  //     setIsLoading(true);
  //     await deleteAnimeBookmark(id);
  //   } catch (err) {
  //     alert(`Error deleting bookmark: ${err}`);
  //   }
  // }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {mal_id}: {error.message}
      </div>
    );
  }
  if (!manga) return null;

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
  } = manga.data;

  let allGenres = '';
  for (let i = 0; i < genres.length; i++) {
    if (i !== genres.length - 1) {
      allGenres += `${genres[i].name}, `;
    } else {
      allGenres += genres[i].name;
    }
  }

  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="container">
      {/* <Link to="/" className="btn text-secondary">
        &lt; Back to catalog
      </Link> */}
      <div>
        <i
          class={
            bookmarksList.find((manga) => manga.itemId === JSON.parse(mal_id))
              ? 'fa-solid fa-bookmark'
              : 'fa-regular fa-bookmark'
          }
          onClick={() => handleBookmark(title, type, images)}></i>
      </div>
      <div className="col-3">
        <div className="manga-picture-details">
          <img
            className="details-image"
            src={images.jpg.image_url}
            alt={title}
          />
          <div className="manga-details">
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
          <h1 className="rank">{rank}</h1>
          <h1 className="score">{score}</h1>
          <h1 className="popularity">{popularity}</h1>
        </div>
        <div>
          Synopsis
          {synopsis}
        </div>
        <div className="rate-review-row">
          {bookmarksList.find(
            (manga) => manga.itemId === JSON.parse(mal_id)
          ) ? (
            <button
              type="button"
              className="btn btn-primary rate"
              data-bs-toggle="modal"
              data-bs-target="#reviewModal">
              > Edit Review
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary rate"
              data-bs-toggle="modal"
              data-bs-target="#reviewModal">
              > Leave a Review
            </button>
          )}

          <div class="modal fade" id="reviewModal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <form
                  onSubmit={() =>
                    handleReview(title, mal_id, images.jpg.image_url)
                  }>
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
                      className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                      cols="30"
                      rows="10"
                      onChange={(e) => setReview(e.target.value)}
                      value={pastReview}
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
        </div>
      </div>
    </div>
  );
}
