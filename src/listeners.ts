import { Listeners, PackageAction } from './model';
import { getConfig } from './config';
import { setDesign } from './design';

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
        case PackageAction.INITIALIZE:
            const {css, ...other} = data;
            listeners?.initialize?.(other);
            setDesign(css);
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
        case PackageAction.SET_SHARED_DATA: listeners?.setSharedData?.(data.sharedData);
            break;
        case PackageAction.SET_DESIGN:
            setDesign(data.css);
            listeners?.setDesign?.(data.design)
            break;
    }
};

window.addEventListener('message', onMessage);