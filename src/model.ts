import { Design } from 'knowledgeworker-embedded-asset-api-ui';

export interface Config {
    token: string;
    origin: string;
}

export interface Options {
    autoCompletion?: boolean;
}

export enum PackageAction {
    CONFIGURE = 'KW_PACKAGE_CONFIGURE',
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

export interface LMSData {
    learnerName: string;
}

export interface Configuration {
    suspendData: string;
    sharedData: string;
    assetType: AssetType;
    isEvaluated: boolean;
    lmsData: LMSData;
    design: Design;
}

export interface InternalConfiguration extends Configuration {
    css: string;
}

export interface Message {
    type: string;
    payload: {};
}

export interface Listeners {
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
    setDesign?: (design: Design) => void;
    setSharedData?: (sharedData: string) => void;
}