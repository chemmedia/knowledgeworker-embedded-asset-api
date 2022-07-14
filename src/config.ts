import { Config } from './model';

export const getConfig = (): Config | undefined => {
    let config: Partial<Config> = {};

    try {
        config = JSON.parse(window.name);
    } catch (e) {}

    if (!config?.token || !config?.origin) {
        return undefined;
    }

    return config as Config;
};