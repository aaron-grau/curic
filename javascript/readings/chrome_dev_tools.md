# Chrome Dev Tools

Frontend development can be a scary undertaking, especially when HTML grows
complex and JavaScript becomes tangled. Thankfully, modern web browsers provide
us developer tools to test, debug, and even write our HTML, CSS, and JS. Chrome
Dev Tools is one of the best. Let's take a look at just a few of the amazing
tools it gives us.

To [access it][access], open Chrome and hit **Option + Command + i** (Mac) or **F12** (Linux/Windows).

[access]: https://developer.chrome.com/devtools#access

## Debugging Node.js with Dev Tools

Debugging is a little more difficult for server-side JavaScript than for
client-side, which is one of the more frequently-voiced complaints about
Node.js. The Chrome debugger is *really, really awesome*, which is why it would
be super nice if we could still use it for Node. And we can; by importing your node
code and running it in the browser with a HTML page!

### How-To:
  * Create a new html file in your project directory (ie. `w5d3/index.html`).
  * Open it in Atom.
  * Type `html` into your new file and hit **Tab**. Your file should populate to look like this:

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>

    </body>
  </html>
  ```

  * Add a `<script>` tag to the `<body>` of your file. Pass the relative path of the Javascript file you want to test to `src`. For example:

  ```html
  <body>
    <script src="./array.js"></script>
  </body>
  ```

  * Open your html file in Chrome.
    * In the Terminal, navigate to the directory of your file.
    * Use the command `open {file_name}` to open it in Chrome.
  * In Chrome, open Dev Tools.
    * **Option + Command + i** (Mac)
    + **F12** (Linux/Windows).
  * Click on the *Sources* tab and select your file from the file directory to view your file in Dev Tools.
  * *esc* brings up the Console. `console.log` statements print here.
  * To run your file, refresh the Chrome page with Dev Tools open.
  * To add debuggers, either add `debugger` to your html file or add debugging breakpoints by clicking on the
  line number to the left of the code. Refresh.

### TL;DR:

Import your node code and run it in a browser with a
basic HTML page like so:

```html
<html>
  <body>
    <script src="./array.js"></script>
    <script src="./iteration.js"></script>
  </body>
</html>
```

Open the Chrome dev tools and click on the sources tab. You can look at
the JS files there. Click a line number in the gutter to add a debugging breakpoint. You can also add
breakpoints in the code with the `debugger` statement.

Happy debugging!

## Additional Tools
### Elements Inspector

The Elements tab contains the elements inspector. This is likely where you'll
spend most of your time in the Dev Tools, at least at first.

Notice the *magnifying glass* icon. Click it, then click on any element on
the page to bring its HTML into view in the HTML inspector.

The HTML inspector is gold! Use it to figure out how your HTML is working. You
can change the value of any HTML tag attribute by double-clicking on it, or you
can edit the entire element and its children by right-clicking on it and
selecting *Edit as HTML*. Your changes will be reflected in the page immediately.
You can also drag elements to reorder them or right-click and delete them.

Of equal value in the elements tab is the styles pane on the right. This pane
lists all the CSS selectors and attributes that affect the currently selected
HTML element, in descending order of precedence. Scroll through the list and
you'll likely see striked-out properties that have been overwritten by ones
above them. You can change property values or add new properties to selectors
with the page updating automatically. This is a great way to quickly test out
CSS changes. Just make sure to keep track of and save them, as they'll
disappear when you refresh the page. Lastly, you can get an alphabetical list
of CSS properties affecting the selected element by going to the *Computed*
sub-tab. You can see what CSS selector is providing a property value by
clicking the dropdown arrow to the left.

### Network

You may already be familiar with the Network tab, which is a great tool for
inspecting requests, be they the ones for the initial page load or Ajax.
Network gives you a wealth of information about each request, including the
HTTP method, response status code, and load time. You can click on any request
to see more information about it, including the headers Chrome sent and those
that the server sent back, as well as the request body (for `POST` and `PATCH`
requests) and the response body.

### CSS

The Dev Tools are not just for inspecting and debugging frontend code. You can
also use them to *write* code, particularly CSS and JavaScript. A great way
to write your CSS is in Dev Tools. Follow these steps to start editing your
app's CSS with Chrome:

* Go to the **Sources** tab and make sure the left-hand column is expanded.
  In the left-hand column, select the *Sources* sub-tab.
* You'll see a tree of the resources from your page, organized by path. Navigate
  to the CSS file you want to edit (e.g. `assets/users.css`).
* Right-click on the CSS file, and select *Save As...*. Navigate to the location
  of the CSS file in your file system and save over it (don't worry; it isn't
  really replacing anything yet.)
* Double-click on the CSS file to open it in the Dev Tools editor and start
  styling! Notice how the code you write immediately affects the page. This is
  why this is such an awesome way to code CSS. But don't forget to save
  (command or control + s) to persist your work to disk.
* Lastly, you may want to configure Chrome to use two-space indentation instead
  of four. You can do this through the settings, accessible via the cog wheel
  in the top-right of the Dev Tools window.

### Checking Cookies

Viewing your app's cookies is another useful feat you can accomplish with
Dev Tools. Head over to the Application tab. Here, you can view all the types
of in-browser storage available to your app, such as local storage, as well as
their contents. For cookies, simply open the cookies section of the left-hand
column and select your app's domain (e.g. localhost). Your cookies will be
listed with info including name, value, and expiration date. You can easily
delete cookies when right-clicking on them.

### Console

The console is definitely one of the most powerful parts of Dev Tools. Don't
believe me? Try running `document.getElementsByTagName('*').length`. That's
the total number of HTML elements on the page. Pretty impressive, right?
The console is the place to go for executing code within the context of your
page. It's great for viewing the contents of JavaScript objects. It's where
things go when you `console.log()` them. On top of all that, it features
awesome autocompletion. Just start typing the name of a JavaScript object, and
it'll offer suggestions. Then type a `.`, and you'll get a list of all the
object's properties that narrow down as you type out more. So remember, the
console is basically pry in the browser for JavaScript. Use it wisely.

### Additional Resources

We've only touched the tip of the Dev Tools iceberg. There's much more to
explore, like JavaScript profiling and debugging. Here are a few resources in
case you're hungry for more.

* [Chrome Dev Tools: Using the Console][console]
* [Chrome Dev Tools: Markup and Style][markup-style]
* [Chrome Dev Tools: Networking and the Console][networking-console]
* [Chrome Dev Tools: JavaScript and Performance][js-performance]
* [Official Documentation][dt-docs]


[dt-docs]: https://developers.google.com/chrome-developer-tools/
[console]: https://developers.google.com/web/tools/chrome-devtools/console/
[markup-style]: http://code.tutsplus.com/tutorials/chrome-dev-tools-markup-and-style--net-27149
[networking-console]: http://code.tutsplus.com/tutorials/chrome-dev-tools-networking-and-the-console--net-28167
[js-performance]: http://code.tutsplus.com/tutorials/chrome-dev-tools-javascript-and-performance--net-29671
