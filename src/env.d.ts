/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


interface ImportMetaEnv {
    readonly ALTCHA_API_KEY: string;
    readonly ALTCHA_API_SECRET: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}