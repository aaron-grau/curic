# Display Types

A special CSS attribute one can give to any selector is `display`. The
options for `display` are `inline`, `block`, `inline-block`, `flex` and
`none`.

## Inline

Inline is the display type of most tags that are meant to be
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

![Inline](./images/inline-padding.png?raw=true)

As you can see, these properties only push other elements away
horizontally, not vertically. You cannot specify `height` and `width`
properties on inline elements.

_NB_: See how the text in our `strong` tag is bold, even though we did
not specify a `font-weight` property in our CSS? This is an example of
a User Agent Stylesheet. Most browsers have default styling that is
applied to many tags.

## Block

Block elements differ from inline elements in that they do _not_
respect line height. By default, block elements take up as much
horizontal space as possible. Additionally, they **do** respect
`width` and `height` properties. Observe, if we use the above example,
but change the `display` type of our `strong` tag.

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

![Block](./images/block-padding.png?raw=true)

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

![Inline Block](./images/inline-block.png?raw=true)

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

`display: none` totally removes the content from the (visual) page.
Note that the element is still in the html, and viewable from the
source of the page, it just isn't rendered.


## Flex

The `display: flex` is provided by a W3C Last Call Working Draft module called Flexbox (Flexible Box). This means that it is still not fully supported but it is so close and so powerful that it can be widely used by modern web pages.

The purpose of the Flexbox Layout is to provide a more efficient way to layout, align and distribute space by styling "Flex containers" that automatically calculate the sizes of their children.

This brings up two main categories for all Flexbox properties: 
  1. "Properties for the Parent" (Flex Containers)
  2. "Properties for the Children" (Flex Items)

To make an element into a Flex Container we simply give it the display flex property. This immediately makes all child elements into Flex Items. The size of each flex item is then calculated to always fit within the container. The default direction of these elements is horizontal but can be easily changed with flex-direction.

```css
  /* Imagine this class is given to an element we want to be a flex container */
  
  .container {
    display: flex;
    flex-direction: column;
  }
```

The two next most common flex properties for the Flex Container are `justify-content` and `align-items`. 

Justifying content helps distribute sapce left over when items are eighet inflexible or have reached their maximum size. We can have them all be aligned to the start of the container, end of the container, centered, or even calculate the space between/around to position the elements equally based on their size.

![From CSS Tricks Flexbox Guide](https://css-tricks.com/wp-content/uploads/2013/04/justify-content.svg)

Align Items is very similar to justify content except for the cross axis perpendicular to the main axis.

![From CSS Tricks Flexbox Guide](https://css-tricks.com/wp-content/uploads/2014/05/align-items.svg) 

This is already powerful enough to make for great CSS layouts. For the remaining properties, refer to the great [CSS Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).  Also for additional practice you may want to check out [Flexbox Froggy](http://flexboxfroggy.com/).


