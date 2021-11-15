declare module 'knowledgeworker-embedded-asset-api' {
    export function setHeight(height: number | undefined): void;
    export function disableAutomaticCompletion(): void;
    export function triggerCompleted(): void;
}
