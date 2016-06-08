## CSS Display & Box Model Exercise

Use your latest html recipe page with the latest external stylesheet and update the stylesheet accordingly to practice styling more elements with different display and spacing properties.

1. Make our list elements in the nav menu into inline-block elements
2. Give the links in those list elements a padding on all sides of 20px and change their display property to correct their behavior
3. Pick the right display property to put the nav next to the logo
4. Set our main content region by giving the body a width of 900px
5. Use the classic centering trick `margin: 0 auto` to center the body
6. Give our main section and aside widths 700px, 180px respectively
7. Apply a display property to put the aside and section next to each other and give them some space with a 15px margin-right on the aside.
    - If you find your ingredients list aligned to the bottom use the developer tools to find and correct the styling 
8. Space out the list elements in the ingredients list with a top and bottom margin of 15px
9. Space out the directions the same way
10. Use the display property to put the necessary input elements on their own row. At this point it probably looks better to remove the "Cooking Expertise" and "Rating" labels
11. Space out the select element with margin and give some widths to the text input, select, and textarea to finish up our form.

Compare your results to [this example](./example.html) and [this stylesheet](../../assets/box_model.css).

This exercise was for you to learn the box model and differences between the 3 main display properties (block, inline, inline-block). The anchor tags from step 2 are naturally inline elements which is why they were acting strange when provided padding. Spacing with margin and padding is vital to mastering CSS design. We also used the inline-block property to get our first practice with positioning elements to create a desired layout.

**Challenge:** There is a reason we only gave the aside a margin-right of 15px when it should have been 20px to make up the full 900px of the body. To see what I am talking about, jump into the dev tools, check off the margin-right on the aside, put a `border-left 1px solid black` on the aside and a `border-left 1px solid black` on the section. Why is there still a space between the borders? Research why and try out some corrections.


