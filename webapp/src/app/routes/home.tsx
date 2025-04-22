import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Extension, ExtensionSelect } from "@/features/extension";
import { addExtension } from "@/stores";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setExtension = (extension?: Extension) => {
    if (!extension) return;

    dispatch(addExtension({ extension }));
    navigate(`/extension/${extension.id()}`);
  };

  return (
    <div className="container my-3">
      <ExtensionSelect onUpdate={setExtension} />
    </div>
  );
}

export default Home;
