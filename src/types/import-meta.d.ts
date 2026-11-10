
// src/types/import-meta.d.ts
interface ImportMeta {
  glob: (pattern: string) => Record<string, () => Promise<{ default: unknown }>>;
}
