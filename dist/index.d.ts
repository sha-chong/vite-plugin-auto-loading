import { Plugin } from 'vite';

interface AutoLoadingOptions {
    debug?: boolean;
}
declare function autoLoadingPlugin(options?: AutoLoadingOptions): Plugin;

export { type AutoLoadingOptions, autoLoadingPlugin };
