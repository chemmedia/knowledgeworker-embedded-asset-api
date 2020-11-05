interface Config {
    token?: string;
    origin?: string;
}

const getConfig = (): Config => {
    let config = {};

    try {
        config = JSON.parse(window.name);
    } catch (e) {}

    return config;
};

const setCompletion = (complete: boolean) => {
    const config = getConfig();
    if (config && config.token && config.origin && window.parent) {
        window.parent.postMessage(
            {
                type: 'KW_PACKAGE_SET_COMPLETE',
                token: config.token,
                complete
            },
            config.origin
        );
    }
};

export const setHeight = (height: number) => {
    const config = getConfig();
    if (config && config.token && config.origin && window.parent) {
        window.parent.postMessage(
            {
                type: 'KW_PACKAGE_SET_HEIGHT',
                token: config.token,
                height
            },
            config.origin
        );
    }
};

export const disableAutomaticCompletion = () => {
    setCompletion(false);
};

export const triggerCompleted = () => {
    setCompletion(true);
};

