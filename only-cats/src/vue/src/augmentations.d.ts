// Ensure this file is parsed as a module regardless of dependencies.
// This adds to the definition rather than overwrites it

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }

  interface BreadcumbItem {
    label: string
  }
}
