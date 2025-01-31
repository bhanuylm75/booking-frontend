import "./ske.css";

const SkeletonPlacedetails = () => {
  return (
    <div className="skeletonHotelContainer">
      <div className="skeletonHotelWrapper">
        <div className="skeletonButton skeletonElement"></div>
        <div className="skeletonTitle skeletonElement"></div>
        <div className="skeletonAddress skeletonElement"></div>
        <div className="skeletonDistance skeletonElement"></div>
        <div className="skeletonPriceHighlight skeletonElement"></div>

        <div className="skeletonFpRating">
          <div className="skeletonRatingCircle skeletonElement"></div>
          <div className="skeletonRatingText skeletonElement"></div>
        </div>

        <div className="skeletonImages">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeletonImageWrapper skeletonElement"></div>
          ))}
        </div>

        <div className="skeletonReviewHead skeletonElement"></div>
        <div className="skeletonReviewCon">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeletonReview skeletonElement"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonPlacedetails;
