# Vanilla DOM Manipulation

Today we're going to practice manipulating the DOM without using jQuery -- only vanilla JavaScript for us! Let's get started.

Download the skeleton [zip file][zip], and check out the index file that's already been set up for you. You'll be writing the `script.js` file to manipulate that index page. Just open it in the browser and keep refreshing as you make changes.

As you will notice, none of the interactive features are working. We can't cross restaurants off the list or add places of our own to visit. Time to employ some JavaScript!

[zip]: ./skeleton.zip


- select
- append
- add class
- remove class
- empty
- onClick
- remove click handler
- current target, parent

### Phase I: Crossing off list items

Add some functionality so that when a visitor clicks on one of the SF restaurants in the list, it does actually cross off. Hint: there is a style in the stylesheet that does this for you.

Now, make it so that when you click it again it removes the `line-through` style.

### Phase II: Adding list items

This one's a little trickier. We want to make it so that users can input a place, click the submit button, and have the input box clear out & the new item appended to the list. You've got this. If you're stuck, revisit the [DOM reading][dom-reading].

[dom-reading]: ../../../readings/document-object-model.md
