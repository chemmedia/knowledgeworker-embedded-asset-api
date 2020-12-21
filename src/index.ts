interface Config {
    token: string;
    origin: string;
}

export enum PackageAction {
    READY = 'KW_PACKAGE_READY',
    SET_HEIGHT = 'KW_PACKAGE_SET_HEIGHT',
    SET_COMPLETE = 'KW_PACKAGE_SET_COMPLETE',
    MESSAGE = 'KW_PACKAGE_MESSAGE',
    ANSWERED = 'KW_PACKAGE_ANSWERED',
    CHECK_ANSWER_BUTTON_CLICKED = 'KW_PACKAGE_CHECK_ANSWER_BUTTON_CLICKED',
    SOLUTION_BUTTON_CLICKED = 'KW_PACKAGE_SOLUTION_BUTTON_CLICKED',
    RETRY_BUTTON_CLICKED = 'KW_PACKAGE_RETRY_BUTTON_CLICKED',
    SET_SUSPEND_DATA = 'KW_PACKAGE_SET_SUSPEND_DATA',
    SET_SHARED_DATA = 'KW_PACKAGE_SET_SHARED_DATA',

    INITIALIZE = 'KW_PACKAGE_INITIALIZE',
    SET_EVALUATED = 'KW_PACKAGE_SET_EVALUATED',
    SHOW_CHECK_ANSWER_BUTTON = 'KW_PACKAGE_SHOW_CHECK_ANSWER_BUTTON',
    SHOW_RESULT = 'KW_PACKAGE_SHOW_RESULT',
    SHOW_FEEDBACK = 'KW_PACKAGE_SHOW_FEEDBACK',
    SHOW_ANSWER_FEEDBACK = 'KW_PACKAGE_SHOW_ANSWER_FEEDBACK',
    SHOW_RETRY_BUTTON = 'KW_PACKAGE_SHOW_RETRY_BUTTON',
    SHOW_SOLUTION_BUTTON = 'KW_PACKAGE_SHOW_SOLUTION_BUTTON',
    SHOW_SOLUTION = 'KW_PACKAGE_SHOW_SOLUTION',
    SET_DESIGN = 'KW_PACKAGE_SET_DESIGN',
    DEACTIVATE = 'KW_PACKAGE_DEACTIVATE',
    RESET = 'KW_PACKAGE_RESET',
}

export enum AssetType {
    MEDIUM = 'medium',
    QUESTION = 'question',
    QUESTION_WITH_CUSTOM_QUESTION_TEXT = 'question-with-custom-question-text',
    ADVANCED_QUESTION = 'advanced-question',
}

export interface Design {
    actionColor: string;
    backgroundColor: string;
    buttonStyles: string;
    feedbackNegativeColor: string;
    feedbackPartialPositiveColor: string;
    feedbackPositiveColor: string;
    feedbackSolutionColor: string;
    fontFaces: string;
    headlineTextStyles: string;
    paragraphTextStyles: string;
}

export interface DesignUpdate {
    actionColor?: string;
    backgroundColor?: string;
    buttonStyles?: string;
    feedbackNegativeColor?: string;
    feedbackPartialPositiveColor?: string;
    feedbackPositiveColor?: string;
    feedbackSolutionColor?: string;
    fontFaces?: string;
    headlineTextStyles?: string;
    paragraphTextStyles?: string;
}

export interface Configuration {
    suspendData: string;
    sharedData: string;
    assetType: AssetType;
    isEvaluated: boolean;
    design: Design;
}

export interface Message {
    type: string;
    payload: {};
}

interface Listeners {
    initialize?: (configuration: Configuration) => void;
    setEvaluated?: (isEvaluated: boolean) => void;
    showCheckAnswerButton?: (show: boolean) => void;
    showRetryButton?: (show: boolean) => void;
    showSolutionButton?: (show: boolean) => void;
    showResult?: (passed: boolean) => void;
    showFeedback?: () => void;
    showAnswerFeedback?: () => void;
    showSolution?: () => void;
    deactivate?: () => void;
    reset?: () => void;
    setDesign?: (update: DesignUpdate) => void;
    setSharedData?: (sharedData: string) => void;
}

const getConfig = (): Config | undefined => {
    let config: Partial<Config> = {};

    try {
        config = JSON.parse(window.name);
    } catch (e) {}

    if (!config?.token || !config?.origin) {
        return undefined;
    }

    return config as Config;
};

const sendMessage = (type: PackageAction, data?: {}) => {
    const config = getConfig();
    if (config?.token && config?.origin && window.parent) {
        window.parent.postMessage(
            {
                type,
                token: config.token,
                ...data
            },
            config.origin
        );
    }
}

export const setHeight = (height: number) => {
    if (typeof height !== 'number' || isNaN(height) || height <= 0) {
        throw Error('Height should be a positive number!');
    }

    sendMessage(PackageAction.SET_HEIGHT, { height });
};

export const answered = (answer: string | undefined, passed: boolean, score: number) => {
    if (typeof answer !== 'string' && typeof answer !== 'undefined') {
        throw Error('Answer should be a string or undefined!');
    }

    if (typeof passed !== 'boolean') {
        throw Error('Passed should be a boolean!');
    }

    if (typeof score !== 'number' || isNaN(score) || score < 0 || score > 1) {
        throw Error('Score should be a number between 0 and 1!');
    }

    sendMessage(PackageAction.ANSWERED, { answer, passed, score });
};

export const setSuspendData = (suspendData: string) => {
    if (typeof suspendData !== 'string') {
        throw Error('SuspendData should be a string!');
    }

    sendMessage(PackageAction.SET_SUSPEND_DATA, { suspendData });
};

export const setSharedData = (sharedData: string) => {
    if (typeof sharedData !== 'string') {
        throw Error('SuspendData should be a string!');
    }

    sendMessage(PackageAction.SET_SHARED_DATA, { sharedData });
};

export const completed = () => sendMessage(PackageAction.SET_COMPLETE);
export const ready = () => sendMessage(PackageAction.READY);
export const checkAnswerButtonClicked = () => sendMessage(PackageAction.CHECK_ANSWER_BUTTON_CLICKED);
export const solutionButtonClicked = () => sendMessage(PackageAction.SOLUTION_BUTTON_CLICKED);
export const retryButtonClicked = () => sendMessage(PackageAction.RETRY_BUTTON_CLICKED);
export const message = (message: Message) => sendMessage(PackageAction.MESSAGE, { message });

const listeners: Listeners = {};

export const onInitialize = (listener: Listeners['initialize']) => listeners.initialize = listener;
export const onEvaluatedChanged = (listener: Listeners['setEvaluated']) => listeners.setEvaluated = listener;
export const onShowCheckAnswerButton = (listener: Listeners['showCheckAnswerButton']) => listeners.showCheckAnswerButton = listener;
export const onShowRetryButton = (listener: Listeners['showRetryButton']) => listeners.showRetryButton = listener;
export const onShowSolutionButton = (listener: Listeners['showSolutionButton']) => listeners.showSolutionButton = listener;
export const onShowResult = (listener: Listeners['showResult']) => listeners.showResult = listener;
export const onShowFeedback = (listener: Listeners['showFeedback']) => listeners.showFeedback = listener;
export const onShowAnswerFeedback = (listener: Listeners['showAnswerFeedback']) => listeners.showAnswerFeedback = listener;
export const onShowSolution = (listener: Listeners['showSolution']) => listeners.showSolution = listener;
export const onDeactivate = (listener: Listeners['deactivate']) => listeners.deactivate = listener;
export const onReset = (listener: Listeners['reset']) => listeners.reset = listener;
export const onDesignChanged = (listener: Listeners['setDesign']) => listeners.setDesign = listener;
export const onSharedDataChanged = (listener: Listeners['setSharedData']) => listeners.setSharedData = listener;

const onMessage = (event: MessageEvent) => {
    const config = getConfig();
    const { type, token, ...data } = event.data;

    if (token !== config?.token) {
        return;
    }

    switch (type) {
        case PackageAction.INITIALIZE: listeners?.initialize?.(data);
            break;
        case PackageAction.SET_EVALUATED: listeners?.setEvaluated?.(data.isEvaluated);
            break;
        case PackageAction.SHOW_CHECK_ANSWER_BUTTON: listeners?.showCheckAnswerButton?.(data.show);
            break;
        case PackageAction.SHOW_RETRY_BUTTON: listeners?.showRetryButton?.(data.show);
            break;
        case PackageAction.SHOW_SOLUTION_BUTTON: listeners?.showSolutionButton?.(data.show);
            break;
        case PackageAction.SHOW_RESULT: listeners?.showResult?.(data.passed);
            break;
        case PackageAction.SHOW_FEEDBACK: listeners?.showFeedback?.();
            break;
        case PackageAction.SHOW_ANSWER_FEEDBACK: listeners?.showAnswerFeedback?.();
            break;
        case PackageAction.SHOW_SOLUTION: listeners?.showSolution?.();
            break;
        case PackageAction.DEACTIVATE: listeners?.deactivate?.();
            break;
        case PackageAction.RESET: listeners?.reset?.();
            break;
        case PackageAction.SET_DESIGN: listeners?.setDesign?.(data.update);
            break;
        case PackageAction.SET_SHARED_DATA: listeners?.setSharedData?.(data.sharedData);
            break;
    }
};

window.addEventListener('message', onMessage);
