/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


interface ImportMetaEnv {
    readonly ALTCHA_API_KEY: string;
    readonly BASE_API_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}