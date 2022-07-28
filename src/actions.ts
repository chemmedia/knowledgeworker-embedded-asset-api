import { Message, Options, PackageAction } from './model';
import { getConfig } from './config';

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

export const setHeight = (height: number | undefined) => {
    if (height !== undefined && (typeof height !== 'number' || isNaN(height) || height <= 0)) {
        throw Error('Height should be a positive number or undefined!');
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

export const configure = (options: Options) => {
    if (typeof options !== 'object') {
        throw Error('Options should be an object!');
    }

    sendMessage(PackageAction.CONFIGURE, { options });
};

export const completed = () => sendMessage(PackageAction.SET_COMPLETE, { complete: true });
export const checkAnswerButtonClicked = () => sendMessage(PackageAction.CHECK_ANSWER_BUTTON_CLICKED);
export const solutionButtonClicked = () => sendMessage(PackageAction.SOLUTION_BUTTON_CLICKED);
export const retryButtonClicked = () => sendMessage(PackageAction.RETRY_BUTTON_CLICKED);
export const message = (message: Message) => sendMessage(PackageAction.MESSAGE, { message });
