## Flux Homework: Click Counter Conversion

### Overview

In this project you will convert a simple React project to use the flux pattern.

You will need to change the contents of the `clickCounter.jsx` file as well as
add folders for `stores` and `actions`. A `dispatcher.js` file will need to
be created.

You know you have succeeded when the click counter works again.

### Getting Started

Download **[the project implemented without flux][click-skeleton]**.

First install the node modules using `npm install`. Then, use webpack to bundle
the js. The webpack config file has already been set up for you, so you should
be able to just run `webpack --watch`.

After starting webpack, open `index.html` in your browser. The window should
contain a button with a `0` right next to it. Clicking the button will cause
the number to increment by 1.

Refreshing the page will reset the number to 0.

Now it's time to convert this thing to flux!

### Converting to Flux

I recommend working through this in the following order:

0. `npm install --save flux` to add the flux node module and update `package.json`
0. Create the file for and instance of the dispatcher.
0. Update the `ClickStore` to be a real instance of `Store` from `flux/utils`.
0. Create the file for and object `ClickActions` that will dispatch an action
  to the `ClickStore`. Write the only action, `increment`.
0. Update the `clickCounter.jsx` to register to the change event using the
  appropriate method.
0. Update the `clickCounter.jsx` to call the action in `ClickActions` instead
  of incrementing the store directly.


### Tips
If you see: `'REPLACE ME WITH REACT STUFF!!!'` in the browser window, open the
JS console because there is probably a helpful error in there.

Keep an eye on the `webpack --watch` output so you can see if you have a problem
requiring a file.


### Solutions
Solution [available here][click-solution].

Try hard to finish this project without looking at the solution!
Everything you need to convert this project to flux is available in the
video lectures and provided readings.

### Have fun!

[click-skeleton]: skeleton.zip?raw=true
[click-solution]: solution.zip?raw=true
