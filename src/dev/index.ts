import { setDesign } from '../design.ts';
import { defaultDesign, getStyles } from 'knowledgeworker-embedded-asset-api-ui';

if (process.env.NODE_ENV === 'development') {
    // initialize design in development mode so developers can see the theme without a containing environment
    setDesign(getStyles(defaultDesign));
}
