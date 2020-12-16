export declare enum PackageAction {
    SET_HEIGHT = "KW_PACKAGE_SET_HEIGHT",
    SET_COMPLETE = "KW_PACKAGE_SET_COMPLETE",
    READY = "KW_PACKAGE_READY",
    ANSWERED = "KW_PACKAGE_ANSWERED",
    CHECK_ANSWER_BUTTON_CLICKED = "KW_PACKAGE_CHECK_ANSWER_BUTTON_CLICKED",
    SOLUTION_BUTTON_CLICKED = "KW_PACKAGE_SOLUTION_BUTTON_CLICKED",
    RETRY_BUTTON_CLICKED = "KW_PACKAGE_RETRY_BUTTON_CLICKED",
    SUSPEND_DATA = "KW_PACKAGE_SUSPEND_DATA",
    INITIALIZE = "KW_PACKAGE_INITIALIZE",
    IS_EVALUATED = "KW_PACKAGE_IS_EVALUATED",
    SHOW_CHECK_ANSWER_BUTTON = "KW_PACKAGE_SHOW_CHECK_ANSWER_BUTTON",
    SHOW_RESULT = "KW_PACKAGE_SHOW_RESULT",
    SHOW_FEEDBACK = "KW_PACKAGE_SHOW_FEEDBACK",
    SHOW_ANSWER_FEEDBACK = "KW_PACKAGE_SHOW_ANSWER_FEEDBACK",
    SHOW_RETRY_BUTTON = "KW_PACKAGE_SHOW_RETRY_BUTTON",
    SHOW_SOLUTION_BUTTON = "KW_PACKAGE_SHOW_SOLUTION_BUTTON",
    SHOW_SOLUTION = "KW_PACKAGE_SHOW_SOLUTION",
    UPDATE_DESIGN = "KW_PACKAGE_UPDATE_DESIGN",
    DEACTIVATE = "KW_PACKAGE_DEACTIVATE",
    RESET = "KW_PACKAGE_RESET",
    CUSTOM = "KW_PACKAGE_CUSTOM"
}
export declare enum PackageType {
    MEDIUM = "medium",
    QUESTION = "question",
    QUESTION_WITH_CUSTOM_QUESTION_TEXT = "question-with-custom-question-text",
    ADVANCED_QUESTION = "advanced-question"
}
export interface Configuration {
    suspendData: string;
    packageType: PackageType;
    isEvaluated: boolean;
    isInAssessment: boolean;
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
export declare const setHeight: (height: number) => void;
export declare const answered: (answer: string | undefined, passed: boolean, score: number) => void;
export declare const setSuspendData: (suspendData: string) => void;
export declare const disableAutomaticCompletion: () => void;
export declare const triggerCompleted: () => void;
export declare const ready: () => void;
export declare const checkAnswerButtonClicked: () => void;
export declare const solutionButtonClicked: () => void;
export declare const retryButtonClicked: () => void;
export declare const custom: (data: any) => void;
export declare const onInitialize: (listener: Listeners['initialize']) => ((configuration: Configuration) => void) | undefined;
export declare const onIsEvaluated: (listener: Listeners['isEvaluated']) => ((isEvaluated: boolean) => void) | undefined;
export declare const onShowCheckAnswerButton: (listener: Listeners['showCheckAnswerButton']) => ((show: boolean) => void) | undefined;
export declare const onShowRetryButton: (listener: Listeners['showRetryButton']) => ((show: boolean) => void) | undefined;
export declare const onShowSolutionButton: (listener: Listeners['showSolutionButton']) => ((show: boolean) => void) | undefined;
export declare const onShowResult: (listener: Listeners['showResult']) => ((correct: boolean) => void) | undefined;
export declare const onShowFeedback: (listener: Listeners['showFeedback']) => (() => void) | undefined;
export declare const onShowAnswerFeedback: (listener: Listeners['showAnswerFeedback']) => (() => void) | undefined;
export declare const onShowSolution: (listener: Listeners['showSolution']) => (() => void) | undefined;
export declare const onDeactivate: (listener: Listeners['deactivate']) => (() => void) | undefined;
export declare const onReset: (listener: Listeners['reset']) => (() => void) | undefined;
export declare const onUpdateDesign: (listener: Listeners['updateDesign']) => ((update: DesignUpdate) => void) | undefined;
export {};
