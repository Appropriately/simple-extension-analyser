import Card from "@/components/card";
import { AnalysedFile } from "@/features/extension";

interface Props {
  analysedFile: AnalysedFile;
}

function AnalysedEntry({ analysedFile }: Props) {
  return (
    <Card className="mb-3">
      <Card.Header>Analysis</Card.Header>
      <Card.Body>{JSON.stringify(analysedFile?.urls, null, 2)}</Card.Body>
    </Card>
  );
}

export default AnalysedEntry;
