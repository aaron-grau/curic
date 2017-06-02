## CSS Fluid Grid & Flex Layouts Exercise

Use our latest HTML recipe page with the latest external stylesheet and update the stylesheet accordingly to practice styling using flexbox.

1. First, let's remove the clearfix class from our `header` as it won't play well with flex.
2. Next, we should unfloat our logo image and our `nav`, and remove the `inline-block` display property from the list items in our `nav`.
3. Now that we've undone our beautiful styling we can call flex to our aid! Let's add `display: flex` to our `header` and see what happens.
4. Our logo and nav links should be side-by-side now since they're both children of our header. Now figure out which element needs `display: flex` for our individual nav links to appear side-by-side.
5. The last thing we need is more space between our logo and our nav links. Give our header `justify-content: space-between` so that it arranges its children just the way we want.

Compare your results to [this example](./example.html), [this stylesheet](../../assets/flex.css) and [this grid stylesheet](../../assets/custom_grid.css). [Live version here](http://appacademy.github.io/curriculum/flex.html).
