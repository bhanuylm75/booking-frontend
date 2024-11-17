/* eslint-disable react/prop-types */
import { useState } from "react";
import "./review.css";

const Review = ({ review }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleReadMore = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="review-container">
        <div className="ratingg">{review.rating}</div>
        <div className="author-info">
          <div className="author-initial">{review?.author_name.charAt(0)}</div>
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
        <p className="review-text">
          {review.text.length > 140
            ? `${review.text.slice(0, 140)}... `
            : review.text}
          {review.text.length > 140 && (
            <span className="read-more" onClick={handleReadMore}>
              Read More
            </span>
          )}
        </p>
      </div>

      {isDrawerOpen && (
        <div className="drawer-overlay">
          <div className="drawer">
            <button className="close-btn" onClick={handleCloseDrawer}>
              ×
            </button>
            <div className="drawer-content">
              <h3 className="drawer-author">{review?.author_name}</h3>
              <p className="drawer-review-text">{review.text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
