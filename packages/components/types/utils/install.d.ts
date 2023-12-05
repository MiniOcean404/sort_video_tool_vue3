import type { App, Plugin } from "vue";
export type SFCWithInstall<T> = T & Plugin;
export declare const withInstall: <T, E extends Record<string, any>>(main: T, extra?: E | undefined) => SFCWithInstall<T> & E;
export declare const makeInstaller: (components?: Plugin[]) => {
    install: (app: App) => void;
};
