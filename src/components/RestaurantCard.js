import { CDN_URL } from "../utils/constants"; //named import
import { Link } from "react-router";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla, id } =
    resData?.info;

  return (
    <div className='res-card'>
      <Link to={"/restaurant/" + id} className='res-card-link'>
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
        <h4>{sla?.slaString}</h4>
      </Link>
    </div>
  );
};

export default RestaurantCard;
