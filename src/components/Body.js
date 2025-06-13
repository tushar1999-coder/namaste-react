import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  //local state variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  return (
    <div className='body'>
      <div className='filter-container'>
        <button
          className='filter-btn'
          onClick={() => {
            const filteredList = resList.filter(
              (res) => res.info.avgRating >= 4.5
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants (Rating &gt;= 4.5)
        </button>
        <button
          className='reset-btn'
          onClick={() => {
            setListOfRestaurants(resList);
          }}
        >
          All Restaurants
        </button>
      </div>
      <div className='res-container'>
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
