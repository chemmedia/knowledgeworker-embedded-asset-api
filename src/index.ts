import { typeCheck } from 'type-check';

interface Config {
    token: string;
    origin: string;
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

const sendMessage = (type: string, data?: {}) => {
    const config = getConfig();
    if (config?.token && config?.origin && window.parent) {
        console.log(`KW_PACKAGE_${type}`, data);
        window.parent.postMessage(
            {
                type: `KW_PACKAGE_${type}`,
                token: config.token,
                ...data
            },
            config.origin
        );
    }
}

export const setHeight = (height: number) => {
    if (!typeCheck('Number', height) || height <= 0) {
        throw Error('Height should be a positive number!');
    }

    sendMessage(
        'SET_HEIGHT',
        {
            height
        }
    );
};

const setCompletion = (complete: boolean) => sendMessage(
    'SET_COMPLETE',
    {
        complete
    }
);

export const disableAutomaticCompletion = () => setCompletion(false);

export const triggerCompleted = () => setCompletion(true);

export const ready = () => sendMessage('READY');

export const answered = (answer: string | undefined, passed: boolean, score: number) => {
    if (!typeCheck('String | Undefined', answer)) {
        throw Error('Answer should be a string or undefined!');
    }

    if (!typeCheck('Boolean', passed)) {
        throw Error('Passed should be a boolean!');
    }

    if (!typeCheck('Number', score) || score < 0 || score > 1) {
        throw Error('Score should be a number between 0 and 1!');
    }

    sendMessage(
        'ANSWERED',
        {
            answer,
            passed,
            score
        }
    );
};

export const checkAnswerButtonClicked = () => sendMessage('CHECK_ANSWER_BUTTON_CLICKED');

export const solutionButtonClicked = () => sendMessage('SOLUTION_BUTTON_CLICKED');

export const retryButtonClicked = () => sendMessage('RETRY_BUTTON_CLICKED');

export const setSuspendData = (suspendData: string) => {
    if (!typeCheck('String', suspendData)) {
        throw Error('SuspendData should be a string!');
    }

    sendMessage(
        'SUSPEND_DATA',
        {
            suspendData
        }
    );
};

interface Listeners {
    initialize?: (
        suspendData: string,
        packageType: 'medium' | 'question',
        isEvaluated: boolean,
        isInAssessment: boolean,
    ) => void;
    isEvaluated?: (isEvaluated: boolean) => void;
    showCheckAnswerButton?: (show: boolean) => void;
    showRetryButton?: (show: boolean) => void;
    showSolutionButton?: (show: boolean) => void;
    showResult?: (show: boolean, correct: boolean) => void;
    showFeedback?: (show: boolean) => void;
    showAnswerFeedback?: (show: boolean) => void;
    showSolution?: (show: boolean) => void;
    deactivate?: (show: boolean) => void;
    reset?: (show: boolean) => void;
}

const listeners: Listeners = {};

export const onInitialize = (listener: Listeners['initialize']) => {
  listeners.initialize = listener;
};

export const onIsEvaluated = (listener: Listeners['isEvaluated']) => {
    listeners.isEvaluated = listener;
};

export const onShowCheckAnswerButton = (listener: Listeners['showCheckAnswerButton']) => {
    listeners.showCheckAnswerButton = listener;
};

export const onShowRetryButton = (listener: Listeners['showRetryButton']) => {
    listeners.showRetryButton = listener;
};

export const onShowSolutionButton = (listener: Listeners['showSolutionButton']) => {
    listeners.showSolutionButton = listener;
};

export const onShowResult = (listener: Listeners['showResult']) => {
    listeners.showResult = listener;
};

export const onShowFeedback = (listener: Listeners['showFeedback']) => {
    listeners.showFeedback = listener;
};

export const onShowAnswerFeedback = (listener: Listeners['showAnswerFeedback']) => {
    listeners.showAnswerFeedback = listener;
};

export const onShowSolution = (listener: Listeners['showSolution']) => {
    listeners.showSolution = listener;
};

export const onDeactivate = (listener: Listeners['deactivate']) => {
    listeners.deactivate = listener;
};

export const onReset = (listener: Listeners['reset']) => {
    listeners.reset = listener;
};

const onMessage = (event: MessageEvent) => {
    const config = getConfig();
    const { type, token, ...data } = event.data;
    const shortType = type.match(new RegExp('^(?:KW_PACKAGE_)(.*)'))?.[1];

    if (token !== config?.token || !shortType) {
        return;
    }

    console.log(shortType, data);
    switch (shortType) {
        case 'INITIALIZE': listeners?.initialize?.(
            data.suspendData,
            data.packageType,
            data.isEvaluated,
            data.isInAssessment,
        );
            break;
        case 'IS_EVALUATED': listeners?.isEvaluated?.(data.isEvaluated);
            break;
        case 'SHOW_CHECK_ANSWER_BUTTON': listeners?.showCheckAnswerButton?.(data.show);
            break;
        case 'SHOW_RETRY_BUTTON': listeners?.showRetryButton?.(data.show);
            break;
        case 'SHOW_SOLUTION_BUTTON': listeners?.showSolutionButton?.(data.show);
            break;
        case 'SHOW_RESULT': listeners?.showResult?.(data.show, data.correct);
            break;
        case 'SHOW_FEEDBACK': listeners?.showFeedback?.(data.show);
            break;
        case 'SHOW_ANSWER_FEEDBACK': listeners?.showAnswerFeedback?.(data.show);
            break;
        case 'SHOW_SOLUTION': listeners?.showSolution?.(data.show);
            break;
        case 'DEACTIVATE': listeners?.deactivate?.(data.show);
            break;
        case 'RESET': listeners?.reset?.(data.show);
            break;
    }
};

window.addEventListener('message', onMessage);
