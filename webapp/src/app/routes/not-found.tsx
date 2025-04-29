function NotFound() {
  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col justify-center items-center">
        <h3 className="m-0 text-3xl">Not Found</h3>
        <p className="mt-3 text-lg text-zinc-400">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
