import { AnalysedFile } from "@/features/extension";

import Urls from "./analysis/urls";

interface Props {
  analysedFile: AnalysedFile;
}

function EntryAnalysis({ analysedFile }: Props) {
  return <>{analysedFile.urls && <Urls urls={analysedFile.urls} />}</>;
}

export default EntryAnalysis;
