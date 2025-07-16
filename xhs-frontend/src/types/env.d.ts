/* src/env.d.ts (or just env.d.ts in project root) */

/* ------------------------------------------------------------------
 * 1️⃣  Tell TypeScript this is a Vite project (defines import.meta etc.)
 * ------------------------------------------------------------------ */
/// <reference types="vite/client" />

/* ------------------------------------------------------------------
 * 2️⃣  Let TS understand “*.vue” single-file component imports
 *    – import Foo from './Foo.vue'
 * ------------------------------------------------------------------ */
declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}

/* ------------------------------------------------------------------
 * 3️⃣  Declare the environment variables you will use in code.
 *    •   Only variables that start with **VITE_** can be exposed.
 *    •   Keep this list in sync with your .env files for type safety.
 * ------------------------------------------------------------------ */
interface ImportMetaEnv {
  /**
   * 后端 API 根地址
   * e.g. "https://api.example.com" (prod) or "http://localhost:8000" (dev)
   */
  readonly VITE_API_URL: string;

  /**
   * 应用显示名称，可选
   */
  readonly VITE_APP_NAME?: string;

  /**
   * 任何其他将来需要暴露到客户端的环境变量
   * ⬇️ 继续在这里追加即可
   */
  // readonly VITE_FEATURE_FLAG?: 'on' | 'off'
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
