## CSS Box Model

Download this [skeleton][skeleton]

[skeleton]: ./skeleton.zip

The purpose of this exercise is to learn the box model and start developing an
ability to visualize the structure and organization of HTML elements on a web
page. Every element in an HTML document is enclosed in a box, even those that
don't look like boxes. A circular image, for example, will still be nested
inside its own box when rendered to the page.

Update box_model.css as follows to see how different properties can affect these
boxes.

1. Right now, none of the `div` elements on the page take up any space because
   they are empty. Open up the Chrome inspector (shortcut is `cmd-option-i`) and
   find one of these `div`s on the "Elements" pane. Verify that they are on the
   page and note their dimensions.
2. Let's update our CSS so that all `div`s have a fixed `height` and
   `width` of `200px`. Refresh the page and note their new dimensions in the
   inspector.
3. All boxes in HTML have `padding` and `border` properties available to them.
   Let's give both boxes a `padding` of `50px` and a `border` of `5px solid black`.
4. Note the current `height` and `width` of each box now. The `padding` and `border`
   has been added on top of the original `width` we defined, so we should now have
   a total width and total height of 310px.
5. What if we don't want the `padding` and `border` to be added _on top_ of the
   `width`, but rather be included in the total `width` calculation? We can
   accomplish this by setting the `box-sizing` property to `border-box`. Do this
   for the second box and note the results. Note how the content box has
   shrunken to allow room for the padding and border. *NB*: The default value for
   the box-sizing property is `content-box`.
6. Do box elements always need a set `height` and `width` to be visible? No! Play
   around with adding text into the `p` element and see how it expands and
   shrinks to accomodate its contents.
