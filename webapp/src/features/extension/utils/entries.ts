import { Entry } from "@zip.js/zip.js";
import { EntryTreeNode } from "../types/entry";

export const ROOT_TREE_NODE: EntryTreeNode = {
    name: ".",
    path: ".",
    entries: [],
    children: [],
};

/**
 * Builds a tree structure from the given entries.
 * @param {Entry[]} entries - The entries to build the tree from.
 * @returns {EntryTreeNode} The root of the tree structure.
 */
export const buildEntryTree = (entries: Entry[]): EntryTreeNode => {
    const tree: EntryTreeNode = { ...ROOT_TREE_NODE }
    const pathMap: { [key: string]: EntryTreeNode } = {};
    pathMap["."] = tree;

    entries.forEach((entry) => {
        // Early terminate for root entries
        if (entry.filename.split("/").length <= 1) {
            tree.entries!.push(entry);
            tree.entries!.sort((a, b) => a.filename.localeCompare(b.filename));
            return;
        }

        let fullPath = "./" + entry.filename;
        if (fullPath.endsWith("/")) {
            fullPath = fullPath.slice(0, -1);
        }

        // Get the appropriate tier of the pathMap. If each layer of the path is not already in the map, create it.
        const pathParts = entry.filename.split("/");
        if (pathParts[pathParts.length - 1] === "") {
            pathParts.pop();
        }

        let currentPath = ".";
        for (let i = 0; i < pathParts.length - 1; i++) {
            currentPath += "/" + pathParts[i];
            if (!pathMap[currentPath]) {
                const node: EntryTreeNode = { name: pathParts[i], path: currentPath, entries: [], children: [] };
                pathMap[currentPath] = node;

                // Attach the node to its parent
                const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
                const parentNode = pathMap[parentPath];
                if (parentNode) {
                    parentNode.children!.push(node);
                    parentNode.children!.sort((a, b) => a.name.localeCompare(b.name));
                }
            }
        }

        const parentNode = pathMap[currentPath];
        if (!parentNode) {
            throw new Error(`Parent node not found for path: ${currentPath}`);
        }

        if (entry.directory) {
            const node: EntryTreeNode = { name: pathParts[pathParts.length - 1], path: fullPath, entries: [], children: [] };
            parentNode.children!.push(node);
            parentNode.children!.sort((a, b) => a.name.localeCompare(b.name));
            pathMap[fullPath] = node;
        } else {
            parentNode.entries!.push(entry);
            parentNode.entries!.sort((a, b) => a.filename.localeCompare(b.filename));
        }
    });

    return tree;
};