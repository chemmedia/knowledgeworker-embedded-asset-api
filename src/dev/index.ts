import { setDesign } from '../design.ts';
import { defaultDesign, getStyles } from 'knowledgeworker-embedded-asset-api-ui';

if (import.meta.env.DEV) {
    // initialize design in development mode so developers can see the theme without a containing environment
    setDesign(getStyles(defaultDesign));
}
