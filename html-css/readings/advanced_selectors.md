## CSS Advanced Selectors

With the powerful tools like the Chrome Developer tools now aiding in our workflow and suggesting properties it becomes more important to understand how we may write the cleanest stylesheets with more advanced selectors.

Learning these selectors will also allow us to select aspects of our HTML document in order to enhance the user experience. This [W3 documentation](http://www.w3.org/TR/CSS21/selector.html#pattern-matching) shows the multitude of CSS selectors available. Take a look and then read through an explanation of the most popular ones below.

## Attribute selectors

By using `[]` we can target elements with specified attributes. This is a popular way to style form input elements because of how much they differ based on their type attribute.

```css
    input[type="radio"] {
        -webkit-appearance: none;
        width: 27px;
        height: 27px;
        cursor: pointer;
        background-image: url(../assets/stars.png);
        vertical-align: bottom;
        outline: none;
    }
```

The example selects all input elements with type attributes equal to "radio" and styles several properties. 

**N.B.** The -webkit-appearance property is native to the Webkit rendering engine used by Safari and Chrome. The `-webkit-` part of the property is called a vendor prefix and it is used to declare that this CSS property is from a proprietary rendering engine, not yet declared by CSS W3 standards. Other vendor prefixes include -moz- for Firefox, -o- for opera, and -ms- for Internet Explorer.

The outline property is set to none to reset the default browser action of outlining the radio button in blue. If we wanted to do this for all radio buttons in our application it may make more sense for this to be in the css_reset.css file.

## Pseudo Selectors

Most of the advanced selectors fall under this W3 category called pseudo-class selectors. Check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) for a full reference. Here we have broken down the popular pseudo-class selectors into our own categories for better understanding.

### State selectors

Some state selectors are for specific html elements like option and select.

```css
    input[type="radio"]:checked {
        background-position: 30px 30px;
    }
```

This example is used along with the example in the attributes selector to change the position of the background when the radio button elements are in a **checked** state.

Another common state selector is `:hover`

```css
    input[type="submit"]:hover {
        -webkit-filter: brightness(90%);
    }
```

This example targets the hover state of all submit buttons and uses another advanced webkit property to apply a brightness filter of 90% that darkens the element. This adds to our user experience by inviting them to press the button.

In the Chrome Developer Tools we can toggle element state in order to view the styles being applied:

![Toggling State in Chrome Developer Tools](../assets/chrome_dev_toggle_state.png)

## Structural Selectors

These pseudo selectors target based on extra information given by the structure of the HTML document. 

```css
table tr:nth-of-type(2n) {
    background-color: whitesmoke;
}
```

This example uses `nth-of-type(2n)` to select every other table row element that is a descendent of a table element and applies a grey background color.

```css
header img:first-child {
    width: 100px
}
```

This example could replace a `header > img` selector to allow more image elements in the header but still apply a width to the first one.

Structural pseudo selectors are powerful ways to target elements without having to add extra html markup to our code. Be careful because when making changes to our html document, it may break these selectors. Still, as in the previous example we can use these advanced selectors in time of need to actually allow changes in our HTML document and not break our styling.

## Combinators

We have already seen a couple examples of combining selectors with a space to select descendants or with a `>` to select children.

We can use `ElementA + ElementB {` to target all ElementB elements that immediately proceed ElementA elements.

```css
div ~ p {
    background-color: gold;
}
```

This example uses the `~` combinator to make a more general selection of all siblings. In this case, this would select all paragraph elements that are within the same parent as any div elements.

As with all of these selectors, there are plenty more in the documentation. Most of the time the basics of CSS will be just fine, but for those tough cases when you don't have the ability to make changes to your html sometimes these advanced combinators can really help.
