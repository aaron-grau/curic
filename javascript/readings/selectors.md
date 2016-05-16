# CSS & You

CSS is how we style the HTML markup we write. CSS works by specifying
**attributes** on **selectors**. Here is a simple example:

```css
header {
  color: blue;
}
```

The `header` selector matches any `header` tag it finds in the DOM;
the attribute `color: blue` makes any text wrapped in `header` tags
blue. Note that this will match text wrapped in other tags _within_
the header tags as well. For instance:

```html
<header>
  <h1> A blue title! </h1>
</header>
```

# Be More Specific

Say we want the text inside the `h1` tag above to be pink. CSS is
built to allow us to be as specific as we want. For example:

```html
/* CSS */

header {
  color: blue;
}

header h1 {
  color: pink;
}

/* HTML */
<header>
  This text will be blue!

  <h1> This text will be pink! </h1>
</header>
```

Note that the CSS above will match `h1` tags within `header` tags no
matter how deep they're nested:

```html
<header>
  This text will be BLUE!

  <section>
    <h1> This text will still be PINK! </h1>
  </section>
</header>
```

There are a whole host of ways to match selectors. For instance, say
we only wanted to match top level `h1` tags within the `header` tag
(i.e. `h1` children of the `header` tag, but not `h1` grandchildren)
We could accomplish this via the `>` immediate child selector:

```html
/* CSS */

header {
  color: blue;
}

header > h1 {
  color: pink;
}

/* HTML */
<header>
  This text will be BLUE!

  <h1> This text will be PINK! </h1>

  <section>
    <h1> This text will be BLUE! </h1>
  </section>
</header>
```

There are a lot of ways to match tags. The table under
[Selectors][css3-selectors] gives a comprehensive list of the ways to
do so.

# Precedence
Say we have the following CSS:

```html
h1 {
  color: blue;
}

header > h1 {
  color: orange;
}

header h1 {
  color: pink;
}

h1.some-class {
  color: red;
}
```

If we style both the `h1` tag, and the `header h1` combination, how do
we know which `h1` tag will get which styling? This problem is resolved
via CSS precedence.

Precedence is mostly determined by a selector's "specificity", or how
specific it is: `#id` beats `.class` which beats `tagname`, but the
element's `style` attribute trumps them all. That's the basic order,
though it's a little more nuanced than this. You can read more in-depth
explanations [here][css-precedence-ii] and [here][css-precedence].

## Don't be _too_ specific

If you want to override properties defined for a "specific"
(high specificity) selector, you must use an _even more_ specific
selector. If you have multiple overrides happening in your styles, this
can start to get pretty hairy and hard to manage, so it's important to
follow this simple rule: _**Don't be too specific.**_ Be as specific as
you need to be, but not more. That way you leave yourself plenty of room
to layer on other styles.

[css-precedence]: http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/
[css-precedence-ii]: http://css-tricks.com/specifics-on-css-specificity/

# Classes & IDs

## Classes

Classes are ways to group together tags that should be styled
similarly. To define a class on a tag, we simply set its `class`
property:

```html
<article class="featured">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua.
</article>
```

To match any tag with the `featured` class, we write:

```css
.featured {
  font-weight: bold;
}
```

To match only `article` tags with a `featured` class, we may write:

```css
article.featured {
  font-weight: bold;
}
```

## IDs

IDs, unlike classes, should be used to match a **unique** tag in the
DOM. We define IDs just like we define classes:

```html
<article id="main-post">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua.
</article>
```

To match the `main-post` id, we may write:

```css
#main-post {
  font-weight: bold;
}
```

**Do not use id selectors too aggressively.** If you make a mistake and
label multiple items with the same id, you can get unexpected results.
For instance, using `$("#xyz")` will return just a single one of the
items with the id `xyz`. Only assign an id if the item really will be
unique.

Also keep in mind that IDs are more **specific** than classes, so you
cannot override their styles with a class selector. Remember: don't be
more specific than you have to!

Nine times out of ten, a CSS class will be the better way to go.

# Other Useful Selectors

## Attribute Selector

Sometimes it is useful to select elements in CSS based on a particular value
for an attribute. CSS provides this capability via the attribute selector, which
follows the following format:

```css
tag[attribute="value"]
```

So if we wanted to style any links that link to App Academy's home page, we
could do so with the following CSS:

```css
a[href="http://appacademy.io"] {
  color: red;
}
```

This would apply the style to any links like the following:

```html
<a href="http://appacademy.io">App Academy</a>
```

This format only matches exact values for an attribute, but there are other
variations than can match only part of an attribute value. For instance,
the following would match links with href values that *start with* http:

```css
a[href^="http"]
```


## `:not` Selector

Another useful selector is `:not`. It falls into a special group of selectors
called [pseudo-classes][pseudo_class]. It takes as an argument another selector
and will match all elements to which the passed selector *does not* apply. For
example, consider the following HTML:

```html
<div class="regular"></div>
<div class="regular"></div>
<div class="special"></div>
<div class="regular"></div>
```

We could select the third `<div>` by passing a selector that matches the others,
but not the third one, to `:not`:

```css
div:not(.regular) {
  color: blue;
}
```

[pseudo_class]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

## Helpful Guide

[The 30 CSS Selectors You Must Memorize](http://code.tutsplus.com/tutorials/the-30-css-selectors-you-must-memorize--net-16048)

[css3-selectors]: http://www.w3.org/TR/css3-selectors/#selectors
