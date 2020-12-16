"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUpdateDesign = exports.onReset = exports.onDeactivate = exports.onShowSolution = exports.onShowAnswerFeedback = exports.onShowFeedback = exports.onShowResult = exports.onShowSolutionButton = exports.onShowRetryButton = exports.onShowCheckAnswerButton = exports.onIsEvaluated = exports.onInitialize = exports.custom = exports.retryButtonClicked = exports.solutionButtonClicked = exports.checkAnswerButtonClicked = exports.ready = exports.triggerCompleted = exports.disableAutomaticCompletion = exports.setSuspendData = exports.answered = exports.setHeight = exports.PackageType = exports.PackageAction = void 0;
var PackageAction;
(function (PackageAction) {
    PackageAction["SET_HEIGHT"] = "KW_PACKAGE_SET_HEIGHT";
    PackageAction["SET_COMPLETE"] = "KW_PACKAGE_SET_COMPLETE";
    PackageAction["READY"] = "KW_PACKAGE_READY";
    PackageAction["ANSWERED"] = "KW_PACKAGE_ANSWERED";
    PackageAction["CHECK_ANSWER_BUTTON_CLICKED"] = "KW_PACKAGE_CHECK_ANSWER_BUTTON_CLICKED";
    PackageAction["SOLUTION_BUTTON_CLICKED"] = "KW_PACKAGE_SOLUTION_BUTTON_CLICKED";
    PackageAction["RETRY_BUTTON_CLICKED"] = "KW_PACKAGE_RETRY_BUTTON_CLICKED";
    PackageAction["SUSPEND_DATA"] = "KW_PACKAGE_SUSPEND_DATA";
    PackageAction["INITIALIZE"] = "KW_PACKAGE_INITIALIZE";
    PackageAction["IS_EVALUATED"] = "KW_PACKAGE_IS_EVALUATED";
    PackageAction["SHOW_CHECK_ANSWER_BUTTON"] = "KW_PACKAGE_SHOW_CHECK_ANSWER_BUTTON";
    PackageAction["SHOW_RESULT"] = "KW_PACKAGE_SHOW_RESULT";
    PackageAction["SHOW_FEEDBACK"] = "KW_PACKAGE_SHOW_FEEDBACK";
    PackageAction["SHOW_ANSWER_FEEDBACK"] = "KW_PACKAGE_SHOW_ANSWER_FEEDBACK";
    PackageAction["SHOW_RETRY_BUTTON"] = "KW_PACKAGE_SHOW_RETRY_BUTTON";
    PackageAction["SHOW_SOLUTION_BUTTON"] = "KW_PACKAGE_SHOW_SOLUTION_BUTTON";
    PackageAction["SHOW_SOLUTION"] = "KW_PACKAGE_SHOW_SOLUTION";
    PackageAction["UPDATE_DESIGN"] = "KW_PACKAGE_UPDATE_DESIGN";
    PackageAction["DEACTIVATE"] = "KW_PACKAGE_DEACTIVATE";
    PackageAction["RESET"] = "KW_PACKAGE_RESET";
    PackageAction["CUSTOM"] = "KW_PACKAGE_CUSTOM";
})(PackageAction = exports.PackageAction || (exports.PackageAction = {}));
var PackageType;
(function (PackageType) {
    PackageType["MEDIUM"] = "medium";
    PackageType["QUESTION"] = "question";
    PackageType["QUESTION_WITH_CUSTOM_QUESTION_TEXT"] = "question-with-custom-question-text";
    PackageType["ADVANCED_QUESTION"] = "advanced-question";
})(PackageType = exports.PackageType || (exports.PackageType = {}));
var getConfig = function () {
    var config = {};
    try {
        config = JSON.parse(window.name);
    }
    catch (e) { }
    if (!(config === null || config === void 0 ? void 0 : config.token) || !(config === null || config === void 0 ? void 0 : config.origin)) {
        return undefined;
    }
    return config;
};
var sendMessage = function (type, data) {
    var config = getConfig();
    if ((config === null || config === void 0 ? void 0 : config.token) && (config === null || config === void 0 ? void 0 : config.origin) && window.parent) {
        window.parent.postMessage(__assign({ type: type, token: config.token }, data), config.origin);
    }
};
exports.setHeight = function (height) {
    if (typeof height !== 'number' || isNaN(height) || height <= 0) {
        throw Error('Height should be a positive number!');
    }
    sendMessage(PackageAction.SET_HEIGHT, { height: height });
};
exports.answered = function (answer, passed, score) {
    if (typeof answer !== 'string' && typeof answer !== 'undefined') {
        throw Error('Answer should be a string or undefined!');
    }
    if (typeof passed !== 'boolean') {
        throw Error('Passed should be a boolean!');
    }
    if (typeof score !== 'number' || isNaN(score) || score < 0 || score > 1) {
        throw Error('Score should be a number between 0 and 1!');
    }
    sendMessage(PackageAction.ANSWERED, { answer: answer, passed: passed, score: score });
};
exports.setSuspendData = function (suspendData) {
    if (typeof suspendData !== 'string') {
        throw Error('SuspendData should be a string!');
    }
    sendMessage(PackageAction.SUSPEND_DATA, { suspendData: suspendData });
};
var setCompletion = function (complete) { return sendMessage(PackageAction.SET_COMPLETE, { complete: complete }); };
exports.disableAutomaticCompletion = function () { return setCompletion(false); };
exports.triggerCompleted = function () { return setCompletion(true); };
exports.ready = function () { return sendMessage(PackageAction.READY); };
exports.checkAnswerButtonClicked = function () { return sendMessage(PackageAction.CHECK_ANSWER_BUTTON_CLICKED); };
exports.solutionButtonClicked = function () { return sendMessage(PackageAction.SOLUTION_BUTTON_CLICKED); };
exports.retryButtonClicked = function () { return sendMessage(PackageAction.RETRY_BUTTON_CLICKED); };
exports.custom = function (data) { return sendMessage(PackageAction.CUSTOM, data); };
var listeners = {};
exports.onInitialize = function (listener) { return listeners.initialize = listener; };
exports.onIsEvaluated = function (listener) { return listeners.isEvaluated = listener; };
exports.onShowCheckAnswerButton = function (listener) { return listeners.showCheckAnswerButton = listener; };
exports.onShowRetryButton = function (listener) { return listeners.showRetryButton = listener; };
exports.onShowSolutionButton = function (listener) { return listeners.showSolutionButton = listener; };
exports.onShowResult = function (listener) { return listeners.showResult = listener; };
exports.onShowFeedback = function (listener) { return listeners.showFeedback = listener; };
exports.onShowAnswerFeedback = function (listener) { return listeners.showAnswerFeedback = listener; };
exports.onShowSolution = function (listener) { return listeners.showSolution = listener; };
exports.onDeactivate = function (listener) { return listeners.deactivate = listener; };
exports.onReset = function (listener) { return listeners.reset = listener; };
exports.onUpdateDesign = function (listener) { return listeners.updateDesign = listener; };
var onMessage = function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var config = getConfig();
    var _o = event.data, type = _o.type, token = _o.token, data = __rest(_o, ["type", "token"]);
    if (token !== (config === null || config === void 0 ? void 0 : config.token)) {
        return;
    }
    switch (type) {
        case PackageAction.INITIALIZE:
            (_a = listeners === null || listeners === void 0 ? void 0 : listeners.initialize) === null || _a === void 0 ? void 0 : _a.call(listeners, data);
            break;
        case PackageAction.IS_EVALUATED:
            (_b = listeners === null || listeners === void 0 ? void 0 : listeners.isEvaluated) === null || _b === void 0 ? void 0 : _b.call(listeners, data.isEvaluated);
            break;
        case PackageAction.SHOW_CHECK_ANSWER_BUTTON:
            (_c = listeners === null || listeners === void 0 ? void 0 : listeners.showCheckAnswerButton) === null || _c === void 0 ? void 0 : _c.call(listeners, data.show);
            break;
        case PackageAction.SHOW_RETRY_BUTTON:
            (_d = listeners === null || listeners === void 0 ? void 0 : listeners.showRetryButton) === null || _d === void 0 ? void 0 : _d.call(listeners, data.show);
            break;
        case PackageAction.SHOW_SOLUTION_BUTTON:
            (_e = listeners === null || listeners === void 0 ? void 0 : listeners.showSolutionButton) === null || _e === void 0 ? void 0 : _e.call(listeners, data.show);
            break;
        case PackageAction.SHOW_RESULT:
            (_f = listeners === null || listeners === void 0 ? void 0 : listeners.showResult) === null || _f === void 0 ? void 0 : _f.call(listeners, data.correct);
            break;
        case PackageAction.SHOW_FEEDBACK:
            (_g = listeners === null || listeners === void 0 ? void 0 : listeners.showFeedback) === null || _g === void 0 ? void 0 : _g.call(listeners);
            break;
        case PackageAction.SHOW_ANSWER_FEEDBACK:
            (_h = listeners === null || listeners === void 0 ? void 0 : listeners.showAnswerFeedback) === null || _h === void 0 ? void 0 : _h.call(listeners);
            break;
        case PackageAction.SHOW_SOLUTION:
            (_j = listeners === null || listeners === void 0 ? void 0 : listeners.showSolution) === null || _j === void 0 ? void 0 : _j.call(listeners);
            break;
        case PackageAction.DEACTIVATE:
            (_k = listeners === null || listeners === void 0 ? void 0 : listeners.deactivate) === null || _k === void 0 ? void 0 : _k.call(listeners);
            break;
        case PackageAction.RESET:
            (_l = listeners === null || listeners === void 0 ? void 0 : listeners.reset) === null || _l === void 0 ? void 0 : _l.call(listeners);
            break;
        case PackageAction.UPDATE_DESIGN:
            (_m = listeners === null || listeners === void 0 ? void 0 : listeners.updateDesign) === null || _m === void 0 ? void 0 : _m.call(listeners, data.update);
            break;
    }
};
window.addEventListener('message', onMessage);
