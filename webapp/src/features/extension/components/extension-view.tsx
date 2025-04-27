import { Extension } from "../types";
import CodeBlock from "@/components/code";

interface Props {
  extension: Extension;
}

function ExtensionView({ extension }: Props) {
  return (
    <>
      {extension.manifest && (
        <CodeBlock raw={JSON.stringify(extension.manifest, null, 2)} />
      )}
    </>
  );
}

export default ExtensionView;
