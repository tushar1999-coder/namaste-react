import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  return (
    <div className='error'>
      <h1>Oops!! Something went wrong</h1>
      <h2>
        {err.status} : {err.statusText}
      </h2>
      <img
        src='https://i.pinimg.com/474x/02/6a/cc/026acca08fb7beea6bd4ecd430e312bd.jpg'
        alt='error'
      />
    </div>
  );
};

export default Error;
