import { defaultDesign, getStyles } from 'knowledgeworker-embedded-asset-api-ui';

export const setDesign = (css: string) => {
    style.innerHTML = css;
};

const style = window?.document?.createElement("style");

if (window?.document) {
    const head = window?.document?.head;
    style.id = "kw";
    head.insertBefore(style, head.firstChild);
    style.innerHTML = getStyles(defaultDesign);
}
