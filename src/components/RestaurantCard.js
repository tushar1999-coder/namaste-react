import { CDN_URL } from "../utils/constants"; //named import

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData?.info;

  return (
    <div className='res-card' style={{ backgroundColor: "#f0f0f0" }}>
      <div className='res-logo-container'>
        <img
          className='res-logo'
          alt='res-logo'
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
