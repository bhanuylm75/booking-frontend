const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="custom-card">
          <img
             src="https://via.placeholder.com/400?text="
            alt="No Image Available"
            className="fpImg"
          />
          <div className="skeleton-title"></div>
          <hr className="thin-line" />
          <div className="skeleton-bottom"></div>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
