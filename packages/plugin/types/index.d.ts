import { Plugin } from 'esbuild';
import { Plugin as Plugin_2 } from 'vite';

/**
 * 在 vit e中 dev 模式下会使用 esbuild 对 node_modules 进行预编译，导致找不到映射表中的 filepath，
 * 需要在预编译之前进行替换
 * @param options 替换语言包
 * @returns
 */
export declare function esbuildPluginMonacoEditorNls(options?: Options): Plugin;

export declare function filePathInject(): Plugin_2;

export declare enum Languages {
    bg = "bg",
    cs = "cs",
    de = "de",
    en_gb = "en-gb",
    es = "es",
    fr = "fr",
    hu = "hu",
    id = "id",
    it = "it",
    ja = "ja",
    ko = "ko",
    nl = "nl",
    pl = "pl",
    ps = "ps",
    pt_br = "pt-br",
    ru = "ru",
    tr = "tr",
    uk = "uk",
    zh_hans = "zh-hans",
    zh_hant = "zh-hant"
}

export declare interface Options {
    locale: Languages;
    localeData?: Record<string, any>;
}

export declare function ProxyServer(): Plugin_2;

export declare const RmoveConsole: () => Plugin_2;

/**
 * 使用了monaco-editor-nls 的语言映射包，把原始localize(data, message)的方法，替换成了localize(path, data, defaultMessage)
 * vite build 模式下，使用rollup处理
 * @param options 替换语言包
 * @returns
 */
export declare function vitePluginMonacoEditorNls(options?: Options): Plugin_2;

export { }
