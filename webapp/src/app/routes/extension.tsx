import { useParams } from "react-router-dom";

function Extension() {
  const { id } = useParams();

  return (
    <div>
      <h1>Extension</h1>
      <p>This is the extension page.</p>
      <p>{id}</p>
    </div>
  );
}

export default Extension;
