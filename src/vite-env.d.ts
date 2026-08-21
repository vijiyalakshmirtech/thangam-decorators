/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG_ANALYTICS?: string;
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly NEXT_PUBLIC_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
