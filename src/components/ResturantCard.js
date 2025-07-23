import { IMAGE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines } = resData.info;

  return (
    <div className="res-card">
      <img className="res-image" src={IMAGE_URL + cloudinaryImageId} alt="" />
      <div className="res-desc">
        <div className="res-about">
          <h3 className="res-title">{name}</h3>
          <h3 className="res-rating">{avgRating}</h3>
        </div>
        <h5 className="res-dishes">{cuisines.join(", ")}</h5>
      </div>
    </div>
  );
};

export default RestaurantCard;
