# The Document Object Model (DOM)

When running JavaScript code in the browser, the browser provides an
API by which JavaScript code can access the HTML content of a page.
This API is called the **Document Object Model**. The DOM API is
standardized by the World Wide Web Consortium (W3C); all major
browsers implement it, though there are quirks across browsers.

Let's see a simple HTML page:

```html
<ul id="cats">
</ul>

<script>
  window.setTimeout( () => {
    const ul = document.getElementById("cats");
    const li = document.createElement("li");
    li.textContent = "This is injected by JavaScript";
    ul.appendChild(li);
  }, 1000);
</script>
```

When the script tag is run, `document.getElementById("cats")` asks the
browser to find an element with the id `cats`. This method returns a
subclass of [`HTMLElement`][html-element], which inherits from
[`Element`][element].

We then build a new `li` element, via `document.createElement`. We set
its `textContent`, and then append this to the `ul`. The new element
is not inserted into the page unless we call `appendChild`.

In sum: after 1sec, an `li` saying `"This is injected by JavaScript"`
appears.

There are a couple low-level ways to get HTMLElements:

* `document.getElementById(selector)`
    * Returns a single `Element` matching the id.
* `document.getElementsByClassName(selector)`
    * Returns an Array-like object of type [`NodeList`][node-list] that
      contains all `Element`s matching the class name.
* `document.querySelectorAll(selector)`
    * Returns a `NodeList` of `Element`s matching the CSS selector.

We can also get or set element attributes:

```html
<style>
  .red { background-color: red }
  .green { background-color: green }
</style>

<ul id="cats">
  <li class="green">Markov</li>
  <li class="red">Markov</li>
</ul>

<p>ALL PARAGRAPHS MUST DIE</p>

<label>
  Name
  <input type="text" name="cat[name]" id="cat_name">
</label>

<script>
  window.setTimeout( () => {
    const reds = document.getElementsByClassName("red");
    const greens = document.getElementsByClassName("green");

    // swap the `HTMLElement#className` property
    for (let i = 0; i < reds.length; i++) {
      reds[i].className = "green";
    }
    for (let i = 0; i < greens.length; i++) {
      greens[i].className = "red";
    }

    // disable the input
    document.getElementById("cat_name").disabled = true;

    // Remove a paragraph from the document.
    const paragraph = document.querySelector("p");
    paragraph.parentElement.removeChild(paragraph);
  }, 1000);
</script>
```

## Events

From JavaScript, we have complete freedom to modify the DOM: insert
elements, remove them, change attributes... But this dynamic
modification of the HTML document would be pointless without **event
handling**.

```html
<ul id="cats"></ul>

<form id="cat-form">
  <label>
    Name
    <input type="text" name="cat[name]" id="cat_name">
  </label>

  <input type="submit" value="Create Cat!">
</form>

<script>
  const catFormEl = document.getElementById("cat-form");
  catFormEl.addEventListener("submit", event => {
    // **cancel** the event; if the event were not canceled the browser
    // would try to submit the form for real.
    event.preventDefault();

    // Get the name input element (type `HTMLInputElement`), get the
    // value, and clear it.
    const catNameInputEl = document.getElementById("cat_name")
    const catName = catNameInputEl.value;
    catNameInputEl.value = "";

    // Get the ul of cats.
    const ul = document.getElementById("cats");
    // create an li element
    const li = document.createElement("li");
    // set the text of the li to be the value of the input field
    li.textContent = catName;

    // insert it as the last item in the ul.
    ul.appendChild(li);
  });
</script>
```

Here we used the `EventTarget#addEventListener` method to ask the
browser to store a function. [`EventTarget`][event-target] is a parent
class of `HTMLElement`. The browser will call the function when a
`submit` event happens to the form.

When the user clicks on the submit button in the form, the browser
will **trigger** (also called **fire**) an **event**. Specifically, it
will trigger a `submit` event on the `form` element.

When this happens, the browser will see that the JavaScript code had
previously asked it to run a function whenever a submit event happens
to this form. The browser will stop what it is doing, and call the
JavaScript code.

Events are the means by which JavaScript can react to user behavior.
Some common events:

* `click`, `dblclick`
* `input`, `change`, `submit`
* `keydown`, `keyup`
* `mouseover`, `mousemove`, `mouseout`
* `scroll`, `resize`

MDN, as ever, has a full list of [DOM Events][dom-events].

Let's close out with one last demo:

```html
<button id="alert-button">Click Me For An Alert</button>

<input type="text" id="mystring">

<p id="mystring-reversed"></p>

<script>
  const buttonEl = document.getElementById("alert-button");
  buttonEl.addEventListener("click", event => {
    alert("HELLO");
  });

  const inputEl = document.getElementById("mystring");
  const pEl = document.getElementById("mystring-reversed");
  inputEl.addEventListener("input", () => {
    const value = inputEl.value;
    pEl.textContent = value.split("").reverse().join("");
  });

  pEl.addEventListener("mouseover", () => {
    alert("YOU MOUSED OVER ME!");
  });
</script>
```

[html-element]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[node-list]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[event-target]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
