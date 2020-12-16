interface Config {
    token: string;
    origin: string;
}

export enum PackageAction {
    SET_HEIGHT = 'KW_PACKAGE_SET_HEIGHT',
    SET_COMPLETE = 'KW_PACKAGE_SET_COMPLETE',
    READY = 'KW_PACKAGE_READY',
    ANSWERED = 'KW_PACKAGE_ANSWERED',
    CHECK_ANSWER_BUTTON_CLICKED = 'KW_PACKAGE_CHECK_ANSWER_BUTTON_CLICKED',
    SOLUTION_BUTTON_CLICKED = 'KW_PACKAGE_SOLUTION_BUTTON_CLICKED',
    RETRY_BUTTON_CLICKED = 'KW_PACKAGE_RETRY_BUTTON_CLICKED',
    SUSPEND_DATA = 'KW_PACKAGE_SUSPEND_DATA',
    INITIALIZE = 'KW_PACKAGE_INITIALIZE',
    IS_EVALUATED = 'KW_PACKAGE_IS_EVALUATED',
    SHOW_CHECK_ANSWER_BUTTON = 'KW_PACKAGE_SHOW_CHECK_ANSWER_BUTTON',
    SHOW_RESULT = 'KW_PACKAGE_SHOW_RESULT',
    SHOW_FEEDBACK = 'KW_PACKAGE_SHOW_FEEDBACK',
    SHOW_ANSWER_FEEDBACK = 'KW_PACKAGE_SHOW_ANSWER_FEEDBACK',
    SHOW_RETRY_BUTTON = 'KW_PACKAGE_SHOW_RETRY_BUTTON',
    SHOW_SOLUTION_BUTTON = 'KW_PACKAGE_SHOW_SOLUTION_BUTTON',
    SHOW_SOLUTION = 'KW_PACKAGE_SHOW_SOLUTION',
    UPDATE_DESIGN = 'KW_PACKAGE_UPDATE_DESIGN',
    DEACTIVATE = 'KW_PACKAGE_DEACTIVATE',
    RESET = 'KW_PACKAGE_RESET',
}

export enum PackageType {
    MEDIUM = 'medium',
    QUESTION = 'question',
    QUESTION_WITH_CUSTOM_QUESTION_TEXT = 'question-with-custom-question-text',
    ADVANCED_QUESTION = 'advanced-question',
}

export interface Configuration {
    suspendData: string,
    packageType: PackageType,
    isEvaluated: boolean,
    isInAssessment: boolean,
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

interface Listeners {
    initialize?: (configuration: Configuration) => void;
    isEvaluated?: (isEvaluated: boolean) => void;
    showCheckAnswerButton?: (show: boolean) => void;
    showRetryButton?: (show: boolean) => void;
    showSolutionButton?: (show: boolean) => void;
    showResult?: (correct: boolean) => void;
    showFeedback?: () => void;
    showAnswerFeedback?: () => void;
    showSolution?: () => void;
    deactivate?: () => void;
    reset?: () => void;
    updateDesign?: (update: DesignUpdate) => void;
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

const setCompletion = (complete: boolean) => sendMessage(PackageAction.SET_COMPLETE, { complete });

export const disableAutomaticCompletion = () => setCompletion(false);

export const triggerCompleted = () => setCompletion(true);

export const ready = () => sendMessage(PackageAction.READY);

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

export const checkAnswerButtonClicked = () => sendMessage(PackageAction.CHECK_ANSWER_BUTTON_CLICKED);

export const solutionButtonClicked = () => sendMessage(PackageAction.SOLUTION_BUTTON_CLICKED);

export const retryButtonClicked = () => sendMessage(PackageAction.RETRY_BUTTON_CLICKED);

export const setSuspendData = (suspendData: string) => {
    if (typeof suspendData !== 'string') {
        throw Error('SuspendData should be a string!');
    }

    sendMessage(PackageAction.SUSPEND_DATA, { suspendData });
};

const listeners: Listeners = {};

export const onInitialize = (listener: Listeners['initialize']) => listeners.initialize = listener;
export const onIsEvaluated = (listener: Listeners['isEvaluated']) => listeners.isEvaluated = listener;
export const onShowCheckAnswerButton = (listener: Listeners['showCheckAnswerButton']) => listeners.showCheckAnswerButton = listener;
export const onShowRetryButton = (listener: Listeners['showRetryButton']) => listeners.showRetryButton = listener;
export const onShowSolutionButton = (listener: Listeners['showSolutionButton']) => listeners.showSolutionButton = listener;
export const onShowResult = (listener: Listeners['showResult']) => listeners.showResult = listener;
export const onShowFeedback = (listener: Listeners['showFeedback']) => listeners.showFeedback = listener;
export const onShowAnswerFeedback = (listener: Listeners['showAnswerFeedback']) => listeners.showAnswerFeedback = listener;
export const onShowSolution = (listener: Listeners['showSolution']) => listeners.showSolution = listener;
export const onDeactivate = (listener: Listeners['deactivate']) => listeners.deactivate = listener;
export const onReset = (listener: Listeners['reset']) => listeners.reset = listener;
export const onUpdateDesign = (listener: Listeners['updateDesign']) => listeners.updateDesign = listener;

const onMessage = (event: MessageEvent) => {
    const config = getConfig();
    const { type, token, ...data } = event.data;

    if (token !== config?.token) {
        return;
    }

    switch (type) {
        case PackageAction.INITIALIZE: listeners?.initialize?.(data);
            break;
        case PackageAction.IS_EVALUATED: listeners?.isEvaluated?.(data.isEvaluated);
            break;
        case PackageAction.SHOW_CHECK_ANSWER_BUTTON: listeners?.showCheckAnswerButton?.(data.show);
            break;
        case PackageAction.SHOW_RETRY_BUTTON: listeners?.showRetryButton?.(data.show);
            break;
        case PackageAction.SHOW_SOLUTION_BUTTON: listeners?.showSolutionButton?.(data.show);
            break;
        case PackageAction.SHOW_RESULT: listeners?.showResult?.(data.correct);
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
        case PackageAction.UPDATE_DESIGN: listeners?.updateDesign?.(data.update);
            break;
    }
};

window.addEventListener('message', onMessage);
