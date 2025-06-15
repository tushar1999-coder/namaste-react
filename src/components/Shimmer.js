import ShimmerCard from "./ShimmerCard";

const Shimmer = () => {
  return (
    <div className='shimmer-container'>
      {Array(20)
        .fill("")
        .map((e, index) => (
          <ShimmerCard key={index} />
        ))}
    </div>
  );
};

export default Shimmer;
