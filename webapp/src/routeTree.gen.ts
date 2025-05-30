/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const SettingsIndexLazyImport = createFileRoute('/settings/')()
const ExtensionIdLazyImport = createFileRoute('/extension/$id')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SettingsIndexLazyRoute = SettingsIndexLazyImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/settings/index.lazy').then((d) => d.Route),
)

const ExtensionIdLazyRoute = ExtensionIdLazyImport.update({
  id: '/extension/$id',
  path: '/extension/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/extension/$id.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/extension/$id': {
      id: '/extension/$id'
      path: '/extension/$id'
      fullPath: '/extension/$id'
      preLoaderRoute: typeof ExtensionIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/settings/': {
      id: '/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/extension/$id': typeof ExtensionIdLazyRoute
  '/settings': typeof SettingsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/extension/$id': typeof ExtensionIdLazyRoute
  '/settings': typeof SettingsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/extension/$id': typeof ExtensionIdLazyRoute
  '/settings/': typeof SettingsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/extension/$id' | '/settings'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/extension/$id' | '/settings'
  id: '__root__' | '/' | '/extension/$id' | '/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ExtensionIdLazyRoute: typeof ExtensionIdLazyRoute
  SettingsIndexLazyRoute: typeof SettingsIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ExtensionIdLazyRoute: ExtensionIdLazyRoute,
  SettingsIndexLazyRoute: SettingsIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/extension/$id",
        "/settings/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/extension/$id": {
      "filePath": "extension/$id.lazy.tsx"
    },
    "/settings/": {
      "filePath": "settings/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
