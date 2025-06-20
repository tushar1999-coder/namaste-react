import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import ItemCard from "./ItemCard";
import { useParams } from "react-router";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  //   console.log(resInfo);

  const { resId } = useParams();
  console.log(typeof resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  //mcd - 254105 - restaurant id
  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    //"&catalog_qa=undefined&submitAction=ENTER" - not needed

    const json = await data.json();
    // console.log(json.data.cards[0].card.card.text);

    // setMenuCategories(
    //   json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards
    // );
    setResInfo(json.data);
  };

  // console.log(menuCategories.length);

  if (resInfo === null) {
    return <Shimmer />;
  }

  // moved the above if condition from below to the top because resInfo is null initally
  // so when we try to destructure resInfo, and get name etc, these properties  do not exist
  // inside our resInfo object, so it will throw an error

  const { name, avgRatingString, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  //   const { itemCards } =
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  //   console.log(itemCards[4]);
  // resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card.itemCards - KOrean spicy range;
  //   console.log(
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
  //       .itemCards[5]
  //   );
  //   console.log(
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card
  //   );

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  categories.shift(); // remove the first element (0 index) - which is the restaurant details
  categories.shift(); // remove the second element (1 index) - some other details

  return (
    <div className='menu'>
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <p>{avgRatingString} stars</p>
      {categories?.map((category, index) => {
        const { categoryId, title, itemCards } = category.card.card;
        //jo categoryId hai that is duplicate in the data, that is why i am using index as key
        return (
          <div key={index} className='category'>
            <h2>{title}</h2>
            {itemCards?.map((item) => (
              <ItemCard key={item.card.info.id} item={item} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
