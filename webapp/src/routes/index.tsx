import { useDispatch } from "react-redux";

import ExtensionSelect from "@/components/routes/home/extension-select";
import Extensions from "@/components/routes/home/extensions";
import { Extension } from "@/features/extension";
import { addExtension } from "@/stores";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setExtension = (extension?: Extension) => {
    if (!extension) return;

    dispatch(addExtension({ extension }));
    navigate({ to: `/extension/${extension.id}` });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900/70 to-blue-950 py-3">
        <div className="container mx-auto px-2">
          <ExtensionSelect onUpdate={setExtension} />
        </div>
      </div>

      <div className="container mx-auto px-2 mt-3">
        <Extensions />
      </div>
    </>
  );
}
