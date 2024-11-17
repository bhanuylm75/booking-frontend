/* eslint-disable react/prop-types */
//import React from 'react';

import "./slidearrow.css"
function SlideArrows({ onPrevious, onNext }) {
  return (
    <div className="slider-arrow-container">
      <div className="slider-arrow slider-arrow-left" onClick={onPrevious}>
        <svg viewBox="0 0 24 24">
          <path d="M15.5 19L8.5 12L15.5 5" />
        </svg>
      </div>
      <div className="slider-arrow slider-arrow-right" onClick={onNext}>
        <svg viewBox="0 0 24 24">
          <path d="M8.5 19L15.5 12L8.5 5" />
        </svg>
      </div>
    </div>
  );
}

export default SlideArrows;

