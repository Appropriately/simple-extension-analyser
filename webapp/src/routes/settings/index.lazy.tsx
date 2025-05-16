import AI from "@/components/routes/settings/ai";
import VirusTotal from "@/components/routes/settings/virustotal";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/settings/")({
  component: Settings,
});

function Settings() {
  return (
    <div className="container mx-auto pt-2">
      <VirusTotal className="mb-3" />
      <AI className="mb-3" />
    </div>
  );
}
