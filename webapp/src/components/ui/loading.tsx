import Spinner from "./spinner";

function Loading() {
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center items-center">
        <h3 className="m-0 text-3xl">Loading...</h3>
        <Spinner />
      </div>
    </div>
  );
}

export default Loading;
