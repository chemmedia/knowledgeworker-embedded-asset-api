# Knowledgeworker Create Embedded Asset API

A javascript client to integrate rich content packages into responsive 
[Knowledgeworker Create](https://www.knowledgeworker.com/knowledgeworker-create/?utm_source=code&utm_campaign=embedded-asset-api) contents.

By embedding rich HTML5 assets into Knowledgeworker Create contents, authors of content marketing or digital learning are 
able to create immersive web experiences. This API client allows embedded content to communicate with the Knowledgeworker Create runtime to integrate smoothly into responsive environments.

## Getting Started

These instructions will guide you through the process of integrating the Knowledgeworker Create Embedded Asset API into your web projects.

### Prerequisites

If you are starting from scratch, we highly recommend to fork one of our examples: 
* [Example Medium Repository](https://github.com/chemmedia/knowledgeworker-embedded-asset-api-example)
* [Example Question Repository](https://github.com/chemmedia/knowledgeworker-embedded-asset-api-question-example)

### Install

To install the API library, use your preferred package manager, e.g.

```sh
$ yarn add knowledgeworker-embedded-asset-api
```

## Usage

After installing the API library in your project, you can import actions and handlers into your source as follows:

```ts
// Import a library action or handler into your code
import { setHeight } from 'knowledgeworker-embedded-asset-api';

// Tell the Knowledgeworker Create runtime to display this embedded asset with a height of 500 pixels
setHeight(500);
```
## Initialization

Once your package is ready to communicate with the Knowledgeworker Create runtime you have to tell the API you are ready.
This action must be triggered within a time frame of 1000ms after the [window load event](https://www.w3schools.com/jsref/event_onload.asp). If no action is send within this time, Knowledgeworker Create assumes that the package does not contain any interactions or hidden content relevant for completion and marks it as completed.

```TypeScript
// Import a library component into your code
import { ready, onInitialize } from 'knowledgeworker-embedded-asset-api';

onInitialize((configuration) => {
    // may use `configuration.suspendData` to restore your asset in the last state
});

// Tells Knowledgeworker Create that this embedded asset is ready to handle events.
ready();
```

## Actions
### `ready(): void`
Tells Knowledgeworker Create that the embedded asset is ready to handle events.

### `setHeight(height: number | undefined): void`

Tells Knowledgeworker Create to display the embedded asset with the given height. Use `undefined` to restore default behavior.

Embedded assets are integrated via an [iframe tag](https://www.w3schools.com/tags/tag_iframe.asp). Knowledgeworker Create automatically adjusts the width of this iframe to fit the device screen size as well as surrounding content elements. By default, the height is calculated based on the current width and the initial aspect ratio configured by maximum width and height in the Knowledgeworker Create media asset editor. However, this does not suit all content display situations or dynamic contents and in these circumstances you may want to explicitly set the height of your embedded assets.

Example:
```TypeScript
import { setHeight } from 'knowledgeworker-embedded-asset-api';

// Display this embedded asset with a height of 350 pixels
setHeight(350);
```

### `setSuspendData(suspendData: string): void`
Use the supendData to store the state of the asset, e.g. given answers. This suspendData is made available again when the asset is restarted in the `onInitialize` handler.
Keep in mind that in various eLearning communication standards like SCORM the amount of data that can be stored is extremely limited. Reduce the stored data to the most necessary.

Example:

```TypeScript
import { setSuspendData } from 'knowledgeworker-embedded-asset-api';

// save suspendData each time a button is clicked
someButton.addEventListener("click", () => {
    setSuspendData('scene1');
});
```

### `setSharedData(sharedData: string): void`
Shared Data is used to exchange data between different assets within a Knowledgeworker Create course. This data can be written and read by all embedded assets and is made available again when the asset is restarted in the `onInitialize` handler and each time it changes in the `onSharedDataChanged` handler.
Keep in mind that in various eLearning communication standards like SCORM the amount of data that can be stored is extremely limited. Reduce the stored data to the most necessary.

Example:

```TypeScript
import { setSharedData } from 'knowledgeworker-embedded-asset-api';

// save sharedData each time a button is clicked
someButton.addEventListener("click", () => {
    setSharedData(JSON.stringify({ badges: ['hero'] }));
});
```

### `completed(): void`
This action is only for assets of type `medium` and not needed by question assets.

Simple assets, such as images, may be marked as completed once they have been displayed to the user. Many types of assets initially hide parts of their content to reduce cognitive load and to adapt to users individual needs. To measure completion, such hidden contents may have to be taken into account. When all relevant content has been viewed, the asset must trigger the `complete()` action.
Typically, this event will occur after the user has read all texts, finished watching animations and videos or completed all interactions in your asset.

Example:

```TypeScript
import { complete } from 'knowledgeworker-embedded-asset-api';

// Mark the asset as completed
somePopup.addEventListener("click", () => complete());
```

### `answered(answer: string | undefined, passed: boolean, score: number): void`
This action is only for assets of type `question`, `question-with-custom-question-text` and `advanced-question`.

This action should be triggered every time the user submits or revokes an answer. If the answer is a `string`, the question is marked as evaluable.

* `answer` 
    * `undefined` if there is now answer yet or the answer is reverted by the user
    * a `string` of the user selected answer(s), used for tracking e.g. in SCORM or xAPI.
* `passed` define if the question ist passed with the previous given answer
* `score` score from 0 to 1 reached by the user

Example:

```TypeScript
import { answered } from 'knowledgeworker-embedded-asset-api';

// store answer each time a button is clicked
someButton.addEventListener("click", () => {
    answered('my answer', true, 1);
});
````

### `checkAnswerButtonClicked(): void`
### `solutionButtonClicked(): void`
### `retryButtonClicked(): void`
These actions are only for assets of type `advanced-question`.
Advanced question assets provide buttons for "Check answer", "Retry" and "Show solution" by themselfes when needed. When these are clicked, the API must be informed.

Example:

```TypeScript
import { checkAnswerButtonClicked } from 'knowledgeworker-embedded-asset-api';

// notify that the checkAnswer button was clicked
myAnswerButton.addEventListener("click", () => checkAnswerButtonClicked());
```

### `message(message: Message): void`
If you need additional custom behaviour, a customization of the resonsive layout engine in Knowledgeworker Create is needed. Please contact [Knowledgeworker Create Support](https://support.chemmedia.de/). If necessary, we will then ask you to send additional data via the `message` action.

Type:
```TypeScript
interface Message {
    type: string;
    payload: {};
}
```

```TypeScript
import { message } from 'knowledgeworker-embedded-asset-api';

message({
    type: "MY_EVENT",
    payload: {
        myValues: "are here"
    }
});
```

## Handlers
### `onInitialize(configuration: Configuration): void`
Is triggered directly after the `ready` action and provides the asset with the necessary information to initialise itself.

Types:
```TypeScript
enum AssetType {
    MEDIUM = 'medium',
    QUESTION = 'question',
    QUESTION_WITH_CUSTOM_QUESTION_TEXT = 'question-with-custom-question-text',
    ADVANCED_QUESTION = 'advanced-question',
}

interface Design {
    actionColor: string;
    backgroundColor: string;
    buttonStyles: string; // experimental, could change in release
    feedbackNegativeColor: string;
    feedbackPartialPositiveColor: string;
    feedbackPositiveColor: string;
    feedbackSolutionColor: string;
    fontFaces: string; // experimental, could change in release
    headlineTextStyles: string; // experimental, could change in release
    paragraphTextStyles: string; // experimental, could change in release
}

interface Configuration {
    suspendData: string;
    sharedData: string;
    assetType: AssetType;
    isEvaluated: boolean;
    learnerName: string;
    design: Design;
}
```

Example:
```TypeScript
// Import a library component into your code
import { ready, onInitialize } from 'knowledgeworker-embedded-asset-api';

onInitialize((configuration) => {
    // may use `configuration.suspendData` to restore your asset in the last state
});

// Tells the Knowledgeworker Create that the embedded asset is ready to handle events.
ready();
```

### `onEvaluatedChanged(isEvaluated: boolean): void`
This handler is only for assets of type `question`, `question-with-custom-question-text` and `advanced-question`.
Tells the embedded asset that the setting is changed weather the asset is evaluated or not on runtime. For comparison, the initial value is supplied in `onInitialze`.

Example:
```TypeScript
import { onEvaluatedChanged } from 'knowledgeworker-embedded-asset-api';

// Handle if changed weather the asset is evaluated or not
onEvaluatedChanged(isEvaluated => {
    // update something
});
```

### `onDesignChanged(update: DesignUpdate): void`
Tells the embedded asset that there is an update of design params. For comparison, the initial value is supplied in `onInitialze`.
Only the changed params are supplied,

Types:
```TypeScript
interface DesignUpdate {
    actionColor?: string;
    backgroundColor?: string;
    buttonStyles?: string; // experimental, could change in release
    feedbackNegativeColor?: string;
    feedbackPartialPositiveColor?: string;
    feedbackPositiveColor?: string;
    feedbackSolutionColor?: string;
    fontFaces?: string; // experimental, could change in release
    headlineTextStyles?: string; // experimental, could change in release
    paragraphTextStyles?: string; // experimental, could change in release
}
```

Example:
```TypeScript
import { onDesignChanged } from 'knowledgeworker-embedded-asset-api';

// Handle design changes
onDesignChanged(update => {
    if (update.actionColor) {
        // change action color    
    }
});
```

### `onSharedDataChanged(sharedData: string): void`
Tells the embedded asset that the shared data string changed. For comparison, the initial value is supplied in `onInitialze`.

Example:
```TypeScript
import { onSharedDataChanged } from 'knowledgeworker-embedded-asset-api';

// Handle if shared data changes
onSharedDataChanged(sharedData => {
    if (sharedData === "stage1:completed") {
        // update something
    }
});
```

### `onShowResult(passed: boolean): void`
This handler is only for assets of type `question`, `question-with-custom-question-text` and `advanced-question` and only be called if activated in runtime question settings.
Tells the embedded asset to show the result, e.g. mark answers as correct, partial-correct and wrong with `feedbackPositiveColor`, `feedbackPartialPositiveColor` and `feedbackNegativeColor`.

Example:
```TypeScript
import { onShowResult } from 'knowledgeworker-embedded-asset-api';

// Handle if result should be shown
onShowResult(passed => {
    someAnswer.classList.add('correct');
});
```

### `onShowFeedback(): void`
### `onShowAnswerFeedback(): void`
### `onShowSolution(): void`
This handler is only for assets of type `question`, `question-with-custom-question-text` and `advanced-question` and only be called if activated in runtime question settings.
Tells the embedded asset to show feedback, answer related feedback or the solution.

Example:
```TypeScript
import { onShowSolution } from 'knowledgeworker-embedded-asset-api';

// Handle if solution should be shown
onShowSolution(() => {
    someAnswer.classList.add('solution');
});
```

### `onDeactivate(): void`
This handler is only for assets of type `question`, `question-with-custom-question-text` and `advanced-question`.
Tells the embedded asset that the question is checked and answer must not be changeable any more.

Example:
```TypeScript
import { onDeactivate } from 'knowledgeworker-embedded-asset-api';

// Handle if question should be deactivated
onDeactivate(() => {
    document.body.classList.add('deactivated');
});
```

### `onReset(): void`
This handler is only for assets of type `question`, `question-with-custom-question-text` and `advanced-question`.
Tells the embedded asset that there is a new try and the question should be activated an all answers reseted.

Example:
```TypeScript
import { onReset } from 'knowledgeworker-embedded-asset-api';

// Handle if question should be reseted
onReset(() => {
    document.body.classList.remove('deactivated');
    myAnswers = [];
});
```

### `onShowCheckAnswerButton(show: boolean): void`
### `onShowRetryButton(show: boolean): void`
### `onShowSolutionButton(show: boolean): void`
This handler is only for assets of type `advanced-question`.
Tells the embedded asset that one of the "Check answer", "Retry" or "Show solution" should be shown or hidden.

Example:
```TypeScript
import { onShowCheckAnswerButton } from 'knowledgeworker-embedded-asset-api';

// Handle if question should be deactivated
onShowCheckAnswerButton((show) => {
    if (show) {
        checkAnswerButton.removeAttribute('disbaled');
    } else {
        checkAnswerButton.setAttribute('disabled', 'disabled');
    }
});
```

## Deprecation
Version 1 of knowledgeworker-embedded-asset-api is now deprecated, but will be supported until end of 2021.

## Versioning

We use the [SemVer](http://semver.org/) versioning system. For the available versions, please see the tags on this 
repository.

## Compatibility

This Knowledgeworker Embedded Asset API library is compatible with Knowledgeworker Create 21.1 and above.

## Authors

 - Martin Kutter - [chemmedia AG](https://www.chemmedia.de/)
 - Alexander Maasch - [chemmedia AG](https://www.chemmedia.de/)

## Licence

This project is licensed under LGPL 3.0. Please see [LICENSE](./LICENSE) file for more information.
