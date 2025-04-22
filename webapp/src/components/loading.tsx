function Loading() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-auto">
          <h3 className="m-0">Loading...</h3>
        </div>
        <div className="col-auto">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
