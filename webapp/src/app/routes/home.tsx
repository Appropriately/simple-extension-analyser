import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Extension,
  ExtensionSelect,
  getExtensionId,
} from "@/features/extension";
import { addExtension } from "@/stores";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setExtension = (extension?: Extension) => {
    if (!extension) return;

    dispatch(addExtension({ extension }));
    navigate(`/extension/${getExtensionId(extension)}`);
  };

  return (
    <div className="container mx-auto mt-2">
      <ExtensionSelect onUpdate={setExtension} />
    </div>
  );
}

export default Home;
