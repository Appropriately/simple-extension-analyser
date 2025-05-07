import { useDispatch } from "react-redux";

import ExtensionSelect from "@/components/routes/home/extension-select";
import Extensions from "@/components/routes/home/extensions";
import { Card } from "@/components/ui";
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
    <div className="container mx-auto mt-2">
      <Card className="mb-3">
        <Card.Body>
          <ExtensionSelect onUpdate={setExtension} />
        </Card.Body>
      </Card>

      <Extensions />
    </div>
  );
}
