import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "@/components/card";
import { Extension } from "@/features/extension";
import { addExtension } from "@/stores";

import ExtensionSelect from "./home/extension-select";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setExtension = (extension?: Extension) => {
    if (!extension) return;

    dispatch(addExtension({ extension }));
    navigate(`/extension/${extension.id}`);
  };

  return (
    <div className="container mx-auto mt-2">
      <Card className="mb-3">
        <Card.Body>
          <ExtensionSelect onUpdate={setExtension} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
