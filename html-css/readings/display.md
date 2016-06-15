# Display Types

A special CSS attribute one can give to any selector is `display`. The
options for `display` are `inline`, `block`, `inline-block`, `flex`, and
`none`.

## Inline

Inline is the display type of most tags meant to be
interspersed with text. Examples include `a`, `strong`, `span` and
`time`.

Inline elements always keep their "line height". This causes
properties like `margin` and `padding` to behave strangely. For
example, if we write:

```html
/* CSS */
strong {
  background: yellow;
  padding: 10px;
}

/* HTML */
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Inline](../assets/images/inline-padding.png?raw=true)

These properties only push away other elements
horizontally, not vertically. You cannot specify `height` and `width`
properties on inline elements.

_NB_: See how the text in our `strong` tag is bold, even though we did
not specify a `font-weight` property in our CSS? This is an example of
a User Agent Stylesheet. Most browsers have default styling that
applies to many tags.

## Block

Block elements differ from inline ones in that they do _not_
respect line height. By default, block elements take up as much
horizontal space as possible. Additionally, they **do** respect
`width` and `height` properties. Here's the above example with the `display` type of our `strong` tag changed.

```html
/* CSS */
strong {
  background: yellow;
  padding: 10px;
  display: block;
}

/* HTML */
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Block](../assets/images/block-padding.png?raw=true)

### Demo

Check out this [form demo][form_demo] ([code][form_demo_code]). Notice how the
CSS sets the inputs to `display: block` to override their default `inline-block`
behavior:

```css
.input > input {
  display: block;
  ...
}
```

This gives each text input its own line, growing to the width of its container.

[form_demo]: http://appacademy.github.io/css-demos/form.html
[form_demo_code]: https://github.com/appacademy/css-demos/blob/gh-pages/form.html

## Inline block

Inline block elements are a combination of the block and inline
elements. They do remain inline, but they force elements
around them to respect both horizontal and vertical space. You can set
the `width` and `height` properties of an inline block element.

```html
/* CSS */
strong {
  background: yellow;
  width: 100px;
  height: 50px;
  display: inline-block;
}

/* HTML */
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Inline Block](../assets/images/inline-block.png?raw=true)

### Demo

Check out this [centering demo][center_demo] ([code][center_demo_code]). Note
the use of `display: inline-block` to make the `<ul>` respect its parent's
use of `text-align: center`:

```css
header {
  text-align: center;
}

ul {
  display: inline-block;
  ...
}
```

[center_demo]: http://appacademy.github.io/css-demos/center.html
[center_demo_code]: https://github.com/appacademy/css-demos/blob/gh-pages/center.html

## None

`display: none` removes the content from the (visible) page.
Note that the element is still in the HTML and is viewable in the page's source. It just isn't rendered.


## Flex

A W3C Last Call Working Draft module called Flexbox (Flexible Box) provides `display: flex`. It's still not fully supported, but it's pervasive and powerful enough to be used by modern web pages.

The Flexbox Layout provides a more efficient way to align and distribute space by styling "Flex containers" that automatically calculate the sizes of their children.

This brings up two main categories for all Flexbox properties:
  1. "Properties for the Parent" (Flex Containers)
  2. "Properties for the Children" (Flex Items)

To make an element into a Flex Container we simply give it the `display: flex` property. This attribute makes all child elements into Flex Items. The size of each flex item is then calculated to always fit within the container. The default direction of these elements is horizontal but can be easily changed with `flex-direction`.

```css
  /* Imagine this class is given to an element we want to be a flex container */

  .container {
    display: flex;
    flex-direction: column;
  }
```

The two next most common flex properties of a Flex Container are `justify-content` and `align-items`.

Justifying content helps distribute the remaining space when items are either inflexible or have reached their maximum size. We can make all the flex items aligned to the beginning of the container, the end of the container, the center, etc. We can even calculate the space between/around flex items to position them uniformly based on their size.

![From CSS Tricks Flexbox Guide](https://css-tricks.com/wp-content/uploads/2013/04/justify-content.svg)

The `align-items` property is very similar to `justify-content` except it positions items along the cross-axis (perpendicular to the main axis).

![From CSS Tricks Flexbox Guide](https://css-tricks.com/wp-content/uploads/2014/05/align-items.svg)

Lastly, please read about the [flex property](https://css-tricks.com/almanac/properties/f/flex/) which is shorthand for how a Flex Item grows/shrinks compared with remaining items inside its container. 

This is all we need and more to make great CSS layouts. For the remaining properties, refer to the [CSS Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). For additional retention practice check out [Flexbox Froggy](http://flexboxfroggy.com/).
