import VirusTotal from "@/components/routes/settings/virustotal";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/settings/")({
  component: Settings,
});

function Settings() {
  return (
    <>
      <VirusTotal className="mb-3" />
    </>
  );
}
