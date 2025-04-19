import { Entry } from "@zip.js/zip.js";

export interface EntityTreeNode {
    name: string;
    path: string;
    entries: Entry[];
    children: EntityTreeNode[];
}
