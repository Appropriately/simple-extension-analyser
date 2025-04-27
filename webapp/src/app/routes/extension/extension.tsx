import CodeBlock from "@/components/code";
import { Extension } from "@/features/extension";

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
