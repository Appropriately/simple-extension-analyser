import { Entry } from "@zip.js/zip.js";
import { EntityTreeNode } from "../types/entity";

export const ROOT_TREE_NODE: EntityTreeNode = {
    name: ".",
    path: ".",
    entries: [],
    children: [],
};

/**
 * Builds a tree structure from the given entries.
 * @param {Entry[]} entries - The entries to build the tree from.
 * @returns {EntityTreeNode} The root of the tree structure.
 */
export const buildEntryTree = (entries: Entry[]): EntityTreeNode => {
    const tree: EntityTreeNode = { ...ROOT_TREE_NODE }
    const pathMap: { [key: string]: EntityTreeNode } = {};
    pathMap["."] = tree;

    entries.forEach((entry) => {
        // Early terminate for root entries
        if (entry.filename.split("/").length <= 1) {
            tree.entries!.push(entry);
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
                const node: EntityTreeNode = { name: pathParts[i], path: currentPath, entries: [], children: [] };
                pathMap[currentPath] = node;

                // Attach the node to its parent
                const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
                const parentNode = pathMap[parentPath];
                if (parentNode) {
                    parentNode.children!.push(node);
                }
            }
        }

        const parentNode = pathMap[currentPath];
        if (!parentNode) {
            throw new Error(`Parent node not found for path: ${currentPath}`);
        }

        if (entry.directory) {
            const node: EntityTreeNode = { name: pathParts[pathParts.length - 1], path: fullPath, entries: [], children: [] };
            parentNode.children!.push(node);
            pathMap[fullPath] = node;
        } else {
            parentNode.entries!.push(entry);
        }
    });

    return tree;
};