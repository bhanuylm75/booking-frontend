import "./skeleton.css"
const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="custom-card">
          <div
             
            className="skeleton-div"
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
