# App Academy Times

- Bundle Install
- `rails s` in one tab
- `bundle exec guard -P livereload` in another tab

## File Structure

Begin by becoming familiar with the file structure:

```
/app/assets/stylesheets
+-- base
|   +-- colors.scss
|   +-- fonts.scss
|   +-- grid.scss
|   +-- layout.scss
|   +-- reset.scss
+-- components
|   +-- _main_nav.scss
|   +-- _example.scss
+-- application.scss
```

Take a look at the application.scss file:

```css
// CSS Reset
@import "base/reset.scss";

// Core
@import "base/colors.scss";
@import "base/fonts.scss";
@import "base/layout.scss";

// Grid
@import "base/grid.scss";

// Components
@import "components/*";
```

The file is using SASS imports in order to create general styles applied to our entire application and enforce the importing of these stylesheets in a particular order.

Take a peek at the `colors.scss` & `fonts.scss` files that establish SASS variables for you to use throughout styling the application. This makes changing fonts or colors for your entire application much more maintainable.

We won't dive any deeper into SASS throughout this project but it does provide a couple more features if you would like to [read][sass-features] about them. For now just note that when providing font or color values, use the corresponding SASS variables.

[sass-features]: https://github.com/rails/sass-rails#features

[rails-pipeline]: http://guides.rubyonrails.org/asset_pipeline.html#manifest-files-and-directives

Some notes on this project before starting:

- Sometimes the HTML will be given and you must style it yourself, sometimes the styles will be given and you must provide the HTML structure, and sometimes you will be required to do code both
- Html is rendered using rails partials in the `/app/views/static_pages/index.html.erb` file to allow styling of each component separately.
- Images for the application may be found in the `app/assets/images` folder 
- The `docs` folder contains directories `screenshots` of completed designs and `copy` to be pasted as content
- The designer provided sticky notes on the designs to describe hover effects
- Javascript files are provided in the `app/assets/javascripts` folder
- A script tag in the application.html.erb file loads [fontawesome](http://fontawesome.io/icons/) icon classes
- Text content is given in separate text files within the `app/assets/text` folder for you to copy and paste.

# Phase 1: Reset

Always start with a clean slate, by "resetting" the user agent stylesheet provided by the browser with a `stylesheets/base/reset.scss` file. We provided the tag selectors to get you started. Be wise about which properties to inherit, and which to hard-code. 

- Set the `box-sizing` property to inherit, to have all elements behave the same, which is `content-box`, by default.
- Make all images `block` elements, have them expand to the full
`100%` width of their parent container, and have their height grow
`auto`, which means proportionally
- Remove the bullets from list items
- Show the pointer hand on buttons to make it obvious for users to click
- Include the clearfix in your code

[appearance-info]: https://css-tricks.com/almanac/properties/a/appearance/

# Phase 2: The Layout

Start by looking over the `docs/screenshots/overall.png` file to get a feel for the overall application design.

In order to write "cascading" style sheets it is important that we pick out common design elements and essential layout features. We will use the `layout.scss` file when styling aspects common to our entire application.

Notice that all of the content is within a defined content region, meaning that all elements are contained within clean edges away from the side of the screen. This is essential for user experience because it makes content easier to read.

- Apply an `80%` width to the `body` element
- Center the body using the `margin: 0 auto;` trick
- Use the `font-family: $serif` for the base font
- Use `12px` as the deafult `font-size`

# Phase 3: The Header

With our layout styling started we can now begin focusing on each component. Notice that we can break the header down into a `main_nav`, a `masthead` with the logo and a `sections_nav`. 

Breaking down stylesheets into components like this will be essential to developing maintanable code. After coding each section we will return to the main navigation and style the gear dropdown. 

## Main Nav

Compare the provided HTML structure in `/views/shared/_main_nav.html.erb` to the design. Notice we are missing the right side navigation.

- add another `<nav>` for the right side
- add the buttons
- add the gear icon inside of a button

The icons are being imported from FontAwesome and are applied using classes. Use [this list of classes][font-awesome] to find the right image and the html in the `left-nav` as an example.

[font-awesome]: http://fontawesome.io/icons/

A great use for the `layout.scss` stylesheet is to code common button styling for your project. Keeping button styling consistent makes it easier for users to know where to click.

- style the buttons according to the "Subscribe Now" and "Log In" button designs in the `main_nav.jpg` screenshot
- each css property has been provided as a comment

Now it is time to style in the `_main_nav.scss` file. For this section we have provided the selectors for you. Here are some tips:

- `flex` the `main-nav` and use `justify-content` for horizontal spacing
- Use `padding` on the main nav for vertical spacing
- Override the button styling on the left nav to have buttons without backgrounds or borders and with black text
- Use the `$lightest-gray` color for the search, sections and gear button hovers
- Style the necessary `margin` spacing
- Use `font-size` to make the gear icon bigger
- The `vertical-align` property describes the baseline for text elements

## MastHead

Open up the `_masthead.html.erb` file in `app/assets/views/shared` split screen next to the provided `_masthead.scss` file.

First copy and paste all of the text content from `docs/copy/masthead.txt` and then build the HTML structure around it. Here are some tips:

- Notice that the `.masthead` is a flex parent which means it will be used as a containing HTML element and all immediate child elements will become flex-children
- The `align-items` property centers the flex-children horizontally
- The Rails Asset Pipeline takes care of precompiling our assets, so the correct filepath for images in the `assets/images` folder is `assets/example_image.jpg`
- Only list elements should be present within unordered lists, but list elements may contain other elements such as anchor tags or buttons

**After some HTML structuring you will notice some problems with the styling. Refer to the `masthead` screenshot and fix the following items:**

- correctly position the `language-nav`
- remove the last border-right from `masthead-links`
- make the first link in the `language-nav` bold
- add application styling for anchor tags using the `layout.scss` file

## Sections Nav

Place your styles in the `_sections_nav.scss` file and HTML in the `_sections_nav.html.erb` file. The text content can be found in the `docs/copy` folder. Once you have fully completed the sections navigation bar **call over a TA for review**.

## Gear Dropdown

Open up the `javascripts/components` folder and take a look at the `dropdown.js` file. Read the comments to get an understanding how the script works. 

- Add the necessary id attribute to the gear icon in the `main_nav`
- Add the corresponding `.hidden` selector in `layout.scss`

Open the `_gear_dropdown.html.erb` file where we have created the HTML structure of the dropdown. Notice the classes used to divide the different unordered lists and the span elements for the subtitles.

- Render the partial as a child of the gear button using `<%= render partial: 'shared/gear_dropdown' %>`
- Click the gear icon to test the toggling of the `hidden` class.

Style the dropdown in `_gear_dropdown.scss` according to the screenshot:

- Apply the necessary positioning properties
    + position the icon relatively
    + position the dropdown absolutely and use `top, right` to adjust
- Give the dropdown some background, padding, and a border
- Using a defined px `width` for a dropdown is perfectly acceptable
- The `z-index` property is used on positioned elements to place them in front of or behind other elements with the largest `z-index` being in front
- Style the remaining fonts and margins being sure to use propper selectors

For a final touch apply some `box-shadow` to the dropdown to give it a bit more dimension. Box Shadows are highly customizable with values for the `x-offset`, `y-offset`, `blur-radius`, `spread-radius` and `color`. Here is an example using `rgba` colors where the `Alpha` value makes the color super transparent.

```
    box-shadow: -1px 4px 6px 1px rgba(0,0,0,0.09);
```

# Phase 4: The Main Content

For the next phase we will be adding some of the latest App Academy Times news using a flexible grid system. 

- The `docs/copy` folder contains the content for each section. We will copy and paste then build the HTML around it, but first, let's make sure we have a flexible application by using a custom grid system.

## Custom Flexible Grid

Grids are much less complicated than they sound but are used all throughout the web. Popular style frameworks like `bootstrap` by Twitter and `material` by Google all use flexible grid systems. For App Academy Times, we will handroll a simple grid just like in the [CSS Homework][css-grid-homework]. 

Please don't just copy and paste this code. Typing and Debugging CSS/HTML is the best way to learn. Make sure to include the media query with a nice break point that maintains your design, we used `1000px`.

## News Content

Copy in all the content from `docs/copy/main_content.txt` and start by using your grid classes combined with section elements to define the flexible content columns.

- Note that we provided the `<iframe>` video copied from YouTube

This is what we are looking for to start:

![custom-grid-example](docs/screenshots/grid.gif)

[css-grid-homework]: https://github.com/appacademy/curriculum/blob/master/html-css/assets/custom_grid.css

- Now that we have flexible columns in place, use the `main_content.jpg` design to look for elements that are styled similarly and give them some tags/classes. Here are some examples:
    + The bold headers like "Opinion Pages" and "Cat Academy"
    + The "By [example]" lines

- We used <hr> elements and classes for `.hr-top`, `.hr-bottom` written in the `layout.scss` file to get the double lines separating pieces of content
- We used a pseudo content `:after` and `content = ''` to create the blue square next to the comments link
- Using `flex: 1` on the input element will force it to grow or shrink to take up all the space next to it's flex sibling Sign Up button
- Place the `new_office.jpg` image inside of a div with a class like `thumbnail`. This way you can reuse this `thumbnail` class with a styled `height` in px and then make all images `width: 100%` & `height: 100%`. Use `object-fit: cover` on all images inside `thumbnail` to assure the images cover the containing div correctly.
- Try to put as many of the application-wide selectors into the `layout.scss` file as possible. Selectors such as `h1, h2,  img, small, hr, .thumbnail` etc. make more sense in the layout file because we will likely reuse them.

**Get A TA to Review your page before continuing**

[app-academy-video]: https://www.youtube.com/watch?v=ARe9FupzuOA

# Phase 5: The Sections Sidebar

Notice that our flexible website breaks a bit because we don't have flexible fonts. We will leave this discussion for another time and instead use media queries to complete our responsive design. Notice how the amount of links in the sections nav is too big for smaller screen sizes. Refence the `mobile.jpg` screenshot and:

- Write a media query similar to the one used in the `grid.scss` to hide the sections nav at the same viewport width that the columns convert to 100%
- Write a similar media query to hide the language nav
- Finally hide the Subscribe button, Login button and take the margin off the `.left-nav` in the `main_nav` styles. We added a bit of padding as well.

**N.B.** With just these few media queries and a flexible grid system we have a completely responsive website!

Now let's code the sections sidebar so that mobile users still have a way of navigating the many App Academy Times sections. Check out the screenshot for the `sections_sidebar`.

- Copy and paste the HTML from the `sections_nav.html.erb` file into the `sections_sidebar.html.erb` file as a starting point.
- Take a look at the `sidebar.js` to see how the sidebar functions
- Add the `<%= render partial: 'shared/sections_sidebar' %>` to the `_main_nav.html.erb` as a child of a button with `id="sections-sidebar-btn"`
- In `_sections_sidebar.scss`, start with a selector to style the `opacity: 0` normally and `opacity: 1` when it has the additional `.expand` class

**N.B.** We use opacity here instead of display because it is transitionable. 

This is the effect we are going for:

![sidebar-example](docs/screenshots/sidebar.gif)

- The submenu text content may be found in the `docs/copy` folder
- Add the remaining HTML to the `sections_sidebar` by nesting `ul` elements within the `li` elements that require an additional dropdown
- Style according to the `sections_sidebar.jpg` screenshot

Create pure css dropdowns with the following example code:
```html
<section class="dropdown">
    <ul>
        <li>lorem ipsum</li>
        <li>Lorem ipsum dolor</li>
    </ul>
</section>
```


```css
.dropdown {
    position: relative;
}
.dropdown > ul {
    display: none;
    position: absolute;
    /* use top, left, right, bottom to position */
}
.dropdown:hover > ul {
    display: block;
}
```

Use pseudo element [css triangles][css-triangles] on top of triangles to create the arrows for the menu items as well as the submenu dropdown triangles. This code could apply right arrows to the list items in the dropdown HTML from above:

```css
.dropdown li {
    position: relative;
}
.dropdown li:after,
.dropdown li:before {
    content: "";
    position: absolute;
    right: 0;
    top: 25%;
    border-left: 5px solid gray;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    width: 0;
    height: 0;
}
.dropdown li:after {
    right: 2px;
    border-left: 5px solid white;
    z-index: 1;
}
```

[css-triangles]:[https://css-tricks.com/snippets/css/css-triangle/]

# Phase 6: Search Modal

Modals are distinct from dropdowns because they appear to float independently over the application. A common characteristic of a modal is also that the app beneath becomes more opaque and clicking away from the modal will close it.

Take a look at the `search-modal.jpg` screenshot to get a better idea of what this is supposed to look like. Use the `search-modal.js` file to get the id necesary for the search button, modal and overlay.

Create the HTML in the `_search_modal.html.erb` file and style in `_search_modal.scss`. We created a `<section id="overlay" class="overlay hidden"></section>` at the bottom of the `main_content` section.

Here is a trick to making content take up the full width of the viewport even when inside of a smaller container by using viewport units (`vw = viewport width, vh = viewport height`).

```css
  position: absolute;
  width: 100vw;
  left: calc(-50vw + 50%);
```

- We used this trick both to make the full width search modal and overlay
- `height: 100%` is not transitionable...use `max-height` instead
- Inset box shadows with `box-shadow: inset 2px 3px 3px rgba(0,0,0,0.07);`

Before continuing **Call over a TA for review**.

# Phase 7: A Fixed Header

When scrolling past the `sections_nav` a `fixed_sections_nav` should appear. Use the [NYTimes](http://nytimes.com) as an example.


