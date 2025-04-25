import { Extension } from "../types";
import CodeBlock from "@/components/code";

function ExtensionView({ extension }: { extension: Extension }) {
  return <>{extension.manifest && <CodeBlock raw={JSON.stringify(extension.manifest, null, 2)} />}</>;
}

export default ExtensionView;
