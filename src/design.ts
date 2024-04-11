import { defaultDesign, getStyles } from 'knowledgeworker-embedded-asset-api-ui';

export const setDesign = (css: string) => {
    if  (!window.document) {
        return;
    }

    const styleId = 'kw';

    if (!window.document.getElementById(styleId)) {
        const style = window.document.createElement('style');

        const head = window.document.head;
        style.id = styleId;
        head.insertBefore(style, head.firstChild);
        style.innerHTML = getStyles(defaultDesign);
    }

    const styleElement = window.document.getElementById(styleId)

    styleElement && (styleElement.innerHTML = css);
};
