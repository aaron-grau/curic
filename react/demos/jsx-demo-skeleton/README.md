# JSX Demo Instructions

Start by cloning this repository, then run `npm install`. In order to get our
JSX components on the page, we need to use Webpack to compile it into JavaScript
that the browser can understand. In a separate terminal tab, run `webpack
--watch`, which will automatically re-complile your `bundle.js` when you make
changes and save them. This is the file that we're loading in the `<head>`
section of the `index.html` page. If your components aren't appearing on the
page, make sure you check the tab where `webpack --watch` is running, which will
tell you about any syntax errors encountered when bundling the JavaScript file.

When you're ready to start writing JSX, write your components in the
`counter.jsx` file. Check your work by opening `index.html`.
