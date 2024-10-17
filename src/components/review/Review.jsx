/* eslint-disable react/prop-types */

import './review.css';

const Review = ({review}) => {
  console.log(review)
  
  return (
    <div className="review-container">
      <div className="ratingg">{review.rating}</div>
      <div className="author-info">
        <div className="author-initial">
          {review?.author_name.charAt(0)}
        </div>
        <div className="author-details">
          <h3 className="author-name">{review?.author_name}</h3>
          <div className="author-location">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
              alt="India Flag" 
              className="india-flag"
            />
            <span>India</span>
          </div>
        </div>
      </div>
      <p className="review-text">{review.text}</p>
    </div>
  );
}

export default Review;
