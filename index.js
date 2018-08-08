const getConfig = () => {
    let config = {};

    try {
        config = JSON.parse(window.name);
    } catch (e) {}

    return config;
};

exports.setHeight = (height) => {
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

exports.setOnInteractionComplete = (complete) => {
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

