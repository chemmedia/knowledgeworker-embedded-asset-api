# KnowledgeWorker Embedded Asset API

A javascript client to integrate rich content packages into responsive 
[KnowledgeWorker](https://www.knowledgeworker.com/?utm_source=code&utm_campaign=embedded-asset-api) contents.

By embedding rich HTML5 assets into KnowledgeWorker contents, authors of content marketing or digital learning are 
creating immersive web experiences. This API client enables embedded content to communicate with the KnowledgeWorker 
runtime to integrate smoothly into responsive environments.

## Getting Started

These instruction will guide you through the process of integrating the KnowledgeWorker Embedded Asset API into your web 
projects.

### Prerequisites

This API library is written in ES6. To start you should have set up an appropriate build environment such as 
[webpack](https://webpack.js.org/) for your project. If you are starting from scratch, consider having a look at the 
[boilerplate](https://github.com/chemmedia/knowledgeworker-embedded-asset-api-boilerplate).

### Install

To install the api library use your preferred package manager

    $ yarn add knowledgeworker-embedded-asset-api

## Usage

Having installed the api library into your project you can import it into your source as follows:

```ecmascript 6
// Import a library component into your code
import { setHeight } from 'knowledgeworker-embedded-asset-api';

// Tell KnowledgeWorker runtime to display this embedded asset with a height of 500 pixels
setHeight(500);
```

### setHeight

Tell KnowledgeWorker runtime to display the embedded asset with a given height.

Embedded assets are currently integrated as an [iframe tag](https://www.w3schools.com/tags/tag_iframe.asp). The width of 
this iframe is automatically adjusted by KnowledgeWorker to the display space available in respect to device screen size 
and surrounding content elements. The height is derived from the dynamic width according to the initial 
aspect ratio configured by maximum width and height in KnowledgeWorker media asset editor. This however does not fit any 
content display situation or dynamic contents and in these circumstances you may want to explicitly set the height of 
your embedded assets.

```ecmascript 6
Type: setHeight(height: number): void
```

Example:
```ecmascript 6
// Display this embedded asset with a height of 350 pixels
setHeight(350);
```

### disableAutomaticCompletion

Tells KnowledgeWorker that this content contains completion relevant interactions or hidden content.

Simple assets may be seen as completed once they have been displayed to the user, such as images. Many types of assets 
initially hide parts of their content to reduce cognitive load and to adapt to users individual needs. To measure 
completion, such hidden contents may have to be taken into account. If your embedded asset contains such contents you 
will want KnowledgeWorker to leave this assets as incomplete until an event occurs by disabling automatic completion. 
You should then call ```triggerCompleted``` once the user has completely consumed your embedded assets.

Automatic completion is turned on by default and always has to be disabled explicitly to use custom completion.

Automatic completion has to be disabled before the asset finishes it's loading. To safely initialize custom completion 
you should do so before the [window load event](https://www.w3schools.com/jsref/event_onload.asp). 

```ecmascript 6
Type: disableAutomaticCompletion(): void;
```

Example:

```ecmascript 6
// before load event
disableAutomaticCompletion()
```

### triggerCompleted

Mark the embedded asset as completed.

If you turned of automatic completion for your asset calling ```disableAutomaticCompletion()```, your asset has to tell 
Knowledgeworker programmatically when it has been finished by triggering a completion event. Typically this event will 
occur after the user has read all texts, finished watching animations and videos or completed all interactions in your 
asset.

```ecmascript 6
Type: triggerCompleted(): void;
```

Example:

```ecmascript 6
//Finish with the last interaction
someButton.addEventListener("click", () => triggerCompleted());
```

## Versioning

We use the [SemVer](http://semver.org/) versioning system. For the versions available, please see the tags on this 
repository.

## Compatibility

This KnowledgeWorker Embedded Asset API library is compatible with KnowledgeWorker 18.3 and above.

## Authors

 - Martin Kutter - [chemmedia](https://www.chemmedia.de/)
 - Alexander Maasch - [chemmedia](https://www.chemmedia.de/)

## Licence

This project is licensed under LGPL 3.0. Please see [LICENSE](./LICENSE) file for more information.
