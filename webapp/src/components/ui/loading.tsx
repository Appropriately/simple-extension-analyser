import Spinner from "./spinner";

function Loading() {
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
        <Spinner />
      </div>
    </div>
  );
}

export default Loading;
