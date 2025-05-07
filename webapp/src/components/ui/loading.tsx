function Loading() {
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center items-center">
        <h3 className="m-0 text-3xl">Loading...</h3>
        <div className="ml-3 animate-spin h-10 w-10 border-4 border-zinc-500 border-t-transparent rounded-full"></div>
      </div>
    </div>
  );
}

export default Loading;
