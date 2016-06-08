## CSS Syntax

The syntax of a single style declaration in your stylesheet is as follows:

```css
selector {
  property: value; /* This is a comment. Don't forget your semicolons! */ 
}
```

The **values** of the **properties** apply to any HTML elements that match the given **selector**.

Example of styling all `<p>` elements with blue and bolded, sans serif font.

```css
p {
  font-family: sans-serif;
  font-weight: bold;
  color: blue;
}
```

You can have as many style declarations as you wish in a CSS document. You may encounter situations where several selectors match similar elements. This is a feature explaining the "cascading" in Cascading Style Sheets.

### Cascading Styles

```css
p {
    color: black;
}
p span {
    font-style: bold;
}
p span.highlight {
    color: yellow;
}
```


```html
<p>
This is some text in a paragraph element. <span>This text has been styled bold because it is in a span element and a child of a paragraph element.</span><span class="highlight">This text is yellow because the class selector overides the tag selector. It is still bold though!</span>
</p>
```

The example introduces another type of selector and how we can maintain DRY CSS with the use of cascading/overiding styles.

### CSS Basic Selectors

**Element Selector**

You can directly select html elements by stating their name. 
 
Example: Select all `<h1>` elements and make their font size 24px.

```css
h1 {
    font-size: 36px;
}
```

Select children of elements by using a space between names

Example: Select all `<a>` elements that are children of `<li>` elements that are children of `<ul>` elements and remove all text-decoration.

``` css
ul li a {
    text-decoration: none; /* This assures the a elements are not underlined */
}
```

**Class Selector**

Classes are used to create logical groups of elements together for styling purposes. These are extremely popular in front-end development and key to making our style code DRY. 

You reference a class selector with a `.` period. 

```html
<section>This is a normal section</section>
<section class="bg-grey">This is a section with a grey background</section>
```

```css 
.bg-grey {
    background-color: whitesmoke; /* there are a lot of color names */
}
```

**Bad Selectors**

These are selectors that you may see but should never use in practice because they disobey the CSS principle of being only as specific as we need to be.

Universal selectors are usually too broad and are rarely necessary. They are also not as descriptive as classes.

```css
* {
    border: 1px solid red; /* puts a red border around EVERY element */
}
```

ID attributes are provided in HTML and should be unique to their element. This makes ID selectors inherintly too specific and will only lead to repetitive styling. They are declared using a `#`.

```html
<img id="logo"/>
```

```css 
#logo {
    width: 100px;
}
```

Class and Element selectors will get you very far in CSS styling. More advanced selectors will be discussed later in the curriculum.

### Overspecificity

If you want to override properties defined for a "specific"
(high specificity) selector, you must use an _even more_ specific
selector. If you have multiple overrides happening in your styles, this
can start to get difficult to manage, so it's important to
follow this simple rule: **Be only as specific as necessary.**

### Precedence

When we speak of overiding CSS styles and specificity we are inferring to the idea of precedence. The more specific a selector is, the higher it's precedence. Selectors with higher precedence overide lower ones.

Specifity is determined both by the type of selector and by how it is applied to the HTML document. From most specific to least the heirarchy is:

*  inline styles
*  id selectors
*  class selectors
*  element selectors

**Inline Styles**

Inline styling violates the CSS rule of being too specific and therefore should not be used in practice. Inline styles are applied directly to the HTML document with a style attribute.

```html
<span style="font-weight:bold;color:black;">Bold and Black Text</span>
```

**Additional Resources:**
* [CSS Precedence](http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/)
* [CSS-Tricks Precedence](http://css-tricks.com/specifics-on-css-specificity/)
* [CSS Selectors](http://www.w3.org/TR/CSS21/selector.html#pattern-matching)
* [30 Selectors to Memorize](http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/)
