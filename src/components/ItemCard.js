const ItemCard = ({ item }) => {
  // aisa ho skta hai ki description exist na kre - then wo undefined ho jayega
  const { description, imageId, isVeg, name, price, defaultPrice, ratings } =
    item?.card?.info;

  // console.log(defaultPrice);

  return (
    <div className='item-card'>
      <div className='item-details'>
        <div className='veg-non-veg'>
          {isVeg ? (
            <img
              className='isVeg-icon'
              src='https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg'
              alt='Veg'
            ></img>
          ) : (
            <img
              className='isVeg-icon'
              src='https://i.pinimg.com/474x/14/0b/0e/140b0e8a911d1734c496155aa97a56a8.jpg'
              alt='Non-veg'
            ></img>
          )}
        </div>
        <h3>{name}</h3>
        <h4>Rs {Number(price) / 100 || Number(defaultPrice) / 100}</h4>
        {Object.keys(ratings.aggregatedRating).length !== 0 && (
          <p>
            {ratings.aggregatedRating.rating +
              " stars (" +
              ratings.aggregatedRating.ratingCount +
              ")"}
          </p>
        )}
        {description && <p>{description}</p>}
      </div>
      <div className='item-image-container'>
        <img
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
            imageId
          }
          alt={name}
        ></img>
      </div>
    </div>
  );
};

export default ItemCard;
