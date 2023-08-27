import { useEffect, useState } from 'react';
import { getReviews } from '../data';
import { Link } from 'react-router-dom';
import './ReviewsPage.css';

export default function ReviewsPage({ onCreate, onEdit }) {
  const [isLoading, setIsLoading] = useState();
  const [reviews, setReviews] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const reviews = await getReviews();
        console.log(reviews);
        setReviews(reviews);
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
      {/* <div className="review-rating-label">
        <h1 className="item-label"></h1>
        <h1 className="rating-label">Rating</h1>
        <h1 className="review-label">Review</h1>
      </div> */}
      <table>
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
    </div>
  );
}

function Review({ item }) {
  const { title, rating, review, imageUrl, itemId } = item;
  return (
    // <li class="review-container" key={itemId}>
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
        <h3 className="r-review">{review}</h3>
      </td>
    </tr>
    // <div className="r-image-container">
    //   <Link to={`/animeDetails/${itemId}`} className="link">
    //     <div className="review-icon-title-container">
    //       <img src={imageUrl} className="review-image" alt={title} />
    //       <h5 className="review-title">
    //         <span className="span-title">{title}</span>
    //       </h5>
    //     </div>
    //   </Link>
    // </div>

    // <div className="r-rating-container">
    //   {/* <h1 className="rating-label">Rating</h1> */}
    //   <h1 className="review-rating">{rating}</h1>
    // </div>
    // <div className="r-review-container">
    //   {/* <h1 className="review-label">Review</h1> */}
    //   <h3 className="r-review">{review}</h3>
    // </div>
    // </li>
  );
}
