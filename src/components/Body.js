import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //local state variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]); //original list of restaurants from API
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );

  const [searchText, setSearchText] = useState("");

  // Multiple app states are there
  // 1. "Initial Loading State"
  // 2. "Showing Filtered Results"
  // 3. "Showing All Results"
  const [appState, setAppState] = useState("Initial Loading State");

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.18230&lng=78.02520&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    // Optional Chaining
    const jsonResList =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setListOfRestaurants(jsonResList);
    setFilteredListOfRestaurants(jsonResList);

    setAppState("Showing All Results");
  };

  // Conditional Rendering
  if (filteredListOfRestaurants.length === 0) {
    if (appState === "Initial Loading State") {
      return <Shimmer />;
    } else if (appState === "Showing Filtered Results") {
      return (
        <div className='error-container'>
          <h1>No Restaurants Found</h1>
          <p>Please try again</p>
        </div>
      );
    } else if (appState === "Showing All Results") {
      return (
        <div className='error-container'>
          <h1>No Restaurants Found</h1>
          <p>Please reload the webpage</p>
        </div>
      );
    }
  }

  return (
    <div className='body'>
      <div className='filter-container'>
        <div className='search'>
          <input
            type='text'
            placeholder='Search'
            className='search-box'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              //filter the restaurant cards and update the UI
              console.log(searchText);

              if (searchText === "") {
                setFilteredListOfRestaurants(listOfRestaurants);
                setAppState("Showing All Results");
                return;
              }

              // Filter the original list of restaurants based on the search text
              const filteredList = listOfRestaurants.filter((res) => {
                const ans1 = res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());

                const ans2 = res.info.cuisines
                  .join(", ")
                  .toLowerCase()
                  .includes(searchText.toLowerCase());

                return ans1 || ans2;
              });

              setFilteredListOfRestaurants(filteredList);
              setAppState("Showing Filtered Results");
            }}
          >
            Search
          </button>
        </div>
        <button
          className='filter-btn'
          onClick={() => {
            const filteredList = filteredListOfRestaurants.filter(
              (res) => res.info.avgRating >= 4.5
            );
            setFilteredListOfRestaurants(filteredList);
            setAppState("Showing Filtered Results");
          }}
        >
          Top Rated Restaurants (Rating &gt;= 4.5)
        </button>
        <button
          className='reset-btn'
          onClick={() => {
            setFilteredListOfRestaurants(listOfRestaurants);
            setAppState("Showing All Results");
          }}
        >
          All Restaurants
        </button>
      </div>
      <div className='res-container'>
        {filteredListOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
