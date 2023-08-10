import { addReview } from '../data';
import { useState } from 'react';

export default async function Review({ id, imageUrl }) {
  const [rating, setRating] = useState();
  const [review, setReview] = useState();

  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  async function handleReview() {
    try {
      await addReview(rating, review, id, imageUrl);
    } catch (err) {
      alert(`Error deleting entry: ${err}`);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary rate"
        data-bs-toggle="modal"
        data-bs-target="#reviewModal">
        > Leave a Review
      </button>

      <div class="modal fade" id="reviewModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleReview}>
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
                {/* <div className="ratings-options">
                  {ratings.map((rating) => (
                    <h1 rating={rating} onClick={setRating(rating)}>
                      {rating}
                    </h1>
                  ))}
                </div> */}
                <textarea
                  required
                  className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                  cols="30"
                  rows="10"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
