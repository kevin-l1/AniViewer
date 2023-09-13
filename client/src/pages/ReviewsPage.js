import './css/ReviewsPage.css';
import { getReviews } from '../data';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReviewsPage({ setState }) {
  const [isLoading, setIsLoading] = useState();
  const [reviews, setReviews] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const reviews = await getReviews();
        setReviews(reviews);
        setState('reviewPage');
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;
  if (!reviews) return null;

  return (
    <div className="reviews-container">
      {reviews.length > 0 ? (
        <>
          <div className="mobile-reviews-container">
            {reviews.map((review) => (
              <MobileReview item={review} />
            ))}
          </div>
          <table className="reviews-table">
            <tr>
              <th scope="col"></th>
              <th scope="col">
                <h1>Rating</h1>
              </th>
              <th scope="col">
                <h1>Review</h1>
              </th>
            </tr>
            {reviews.map((review) => (
              <Review item={review} />
            ))}
          </table>
        </>
      ) : (
        <h1 className="no-reviews">
          You have currently not created any reviews
        </h1>
      )}
    </div>
  );
}

function MobileReview({ item }) {
  const { title, rating, review, imageUrl, itemId } = item;
  return (
    <div className="review-column">
      <div className="r-mobile-image-container">
        <Link to={`/animeDetails/${itemId}`} className="link">
          <div className="review-icon-title-container">
            <img src={imageUrl} className="review-image" alt={title} />
            <h5 className="review-title">
              <span className="span-title">{title}</span>
            </h5>
          </div>
        </Link>
      </div>
      <div className="rating-row">
        <h2>Rating</h2>
        <h2>{rating}</h2>
      </div>
      <div className="review-row">
        <h2>Review</h2>
        <p>{review}</p>
      </div>
    </div>
  );
}

function Review({ item }) {
  const { title, rating, review, imageUrl, itemId } = item;
  return (
    <tr>
      <td className="image-test">
        <div className="r-image-container">
          <Link to={`/animeDetails/${itemId}`} className="link">
            <div className="review-icon-title-container">
              <img src={imageUrl} className="review-image" alt={title} />
              <h5 className="review-title">
                <span className="span-title">{title}</span>
              </h5>
            </div>
          </Link>
        </div>
      </td>
      <td className="rating-test">
        <h1 className="review-rating">{rating}</h1>
      </td>
      <td className="review-test">
        <p className="r-review">{review}</p>
      </td>
    </tr>
  );
}
