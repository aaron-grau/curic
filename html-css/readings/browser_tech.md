# Browsers

A browser's purpose is to display web resources - HTML documents, images, &c.
The user of a browser tells the browser where the resource is located (usually
by typing a URL into the text input field at the top of the browser), and the browser fetches, parses, and displays that resource.

The main components of a browser are: the user interface (UI), which consists
of the browser's display elements; the browser engine, which coordinates the UI
and the rendering engine; the rendering engine, which displays the requested
content, parsing HTML and CSS if necessary; networking, which handles network
calls; the UI backend, which draws widgets like dropdown lists and windows; the
JavaScript interpreter; and data storage, which manages cookies and
localStorage, among other things. 

Browsers are large and complicated - modern browsers are made up of millions
(yes, you read that correctly) of lines of C++ code.

## The Rendering Engine

N.B. Typically, browser will have an instance of its rendering engine running
for each tab open in the browser.

First off, it is important to note that different browsers use different
rendering engines; the wikipedia page for a browser will tell you what
rendering engine that browser uses. Different rendering engines sometimes
perform tasks in slightly different ways or in a slightly different order, but
in general, they follow the below pattern:

### Parse the HTML document to construct the DOM tree

+ HTML elements get converted to DOM nodes in the "content" tree

### Construct the render tree

+ CSS information (and styling information from the HTML) is used to create the
"render" tree from the "content" tree
  + The render tree contains a rectangle for each node
    + Each rectangle has dimensions and color
  + The rectangles are ordered the same way they will be ordered on the display

### Add layout information to the render tree

+ Each node receives its exact coordinates on the screen

### Paint the render tree

+ The render tree is traversed and each node is painted
  + This step uses the UI backend to access the OS's drawing capabilities

## HTML Parsing

!(https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/layers.png)



Notes:
URI vs URL?

Source: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/