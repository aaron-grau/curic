# App Academy Times

## File Structure

Begin by becoming familiar with the file structure:

```
/app/assets/stylesheets
+-- base
|   +-- colors.scss
|   +-- fonts.scss
|   +-- grid.scss
|   +-- layout.scss
|   +-- main.scss
|   +-- reset.scss
+-- components
|   +-- _main_nav.scss
|   +-- _example.scss
+-- application.scss
```

Take a look at the /base/main.scss file:

```scss
// CSS Reset
@import "reset.scss";

// Core
@import "colors.scss";
@import "fonts.scss";
@import "layout.scss";

// Grid
@import "grid.scss";
```

This file is using SASS imports in order to create general styles applied to our entire application and enforce the importing of these stylesheets in a particular order.

This use of multiple SASS file importing is [recommended by Rails][rails-pipeline]. Take a peek at the `colors.scss` & `fonts.scss` files that establish SASS variables for you to use throughout styling the application. This makes changing fonts or colors for your entire application much easier.

[rails-pipeline]: http://guides.rubyonrails.org/asset_pipeline.html#manifest-files-and-directives

Some notes on this project before starting:

- Sometimes the html will be given and you must style it yourself, sometimes the styles will be given and you must provide the html structure, and sometimes you will be required to do code both.
- Html is rendered using rails partials to allow styling of each component separately. This aligns with the future of coding components using `React.js`
- Images may be found in the `app/assets/images` folder
- Javascript files are provided in the `app/assets/javascripts` folder
- A script tag in the application.html.erb file loads [fontawesome](http://fontawesome.io/icons/) icon classes
- Text content is given in separate text files within the `app/assets/text` folder for you to copy and paste.

## Reset

Start with a clean slate, by "resetting" the user agent stylesheet provided by the browser with a `stylesheets/base/reset.scss` file. We provided the tag selectors to get you started. Be wise about which properties to inherit, and which to hard-code. 

- Set the `box-sizing` property to inherit, to have all elements behave the same, which is `content-box`, by default.
- Make all images `block` elements, have them expand to the full
`100%` width of their parent container, and have their height grow
`auto`, which means proportionally
- Remove the bullets from list items
- Strip the default styling from form input elements by setting their appearance to none (see [here][appearance-info])
- Show the pointer hand on buttons to make it obvious for users to click
- Include the clearfix in your code

[appearance-info]: https://css-tricks.com/almanac/properties/a/appearance/

## Layout

Start by looking over the design and annotated_design screenshots.

In order to write "cascading" style sheets it is important that we pick out common design elements and essential layout features. We will refer back to this `layout.scss` file when styling aspects common to our entire application.

Notice that all of the content is within a **defined content region** annotated as being `80%` width. A **defined content region** is essential for user experience because it makes text content easier to read.

- Apply the content region styling to the `body` element
- Center the body using the `margin: 0 auto;` trick
- Use the `font-family: $sans-serif` for the base font
- Use `12px` as the deafult `font-size`

A great use for the `layout.scss` stylesheet is to code common button styling for your projects. Keeping button styling consistent makes it easier for users to know where to click.

- style buttons according to the `annotated_screenshot.jpg`
- add a `transition: background-color 0.3s`
- add the `button:hover` styling

# Phase 1: The Header

With our layout styling started we can now begin focusing on each component. Notice that we can break the header down into a `main-navigation`, a `masthead` with the logo and a `sections_nav`. 

Breaking down stylesheets into components like this will be essential to developing maintanable code. After coding each section we will return to the main navigation and style the gear dropdown. 

## Main Nav

Compare the provided html structure in `/views/shared/_header.html.erb` to the design. Notice we are missing the right side navigation.

- add another `<nav>` for the right side
- add the buttons
- add the gear icon inside of a button so that it has `cursor: pointer`

Now it is time to style in the `main_nav.css.scss` file. For this section we have provided the selectors for you.

- look at current html structure
- flex the header and justify content
- add buttons for subscribe now and login
- add gear icon like search/section does
- http://fontawesome.io/icons/ just fa-[name of class]
- Add margin to buttons and anchors in left nav
- Add font styling to spans in left nav
- add margin to button and icon in right nav
- add padding to header
- add border to header

## MastHead
- create html to fit provided styling
- add layout styling for anchor tags
- fix positioning of language-nav
- make first link in language-nav bold (tricky)
- remove last border from masthead-links
- color the percentage green

## Sections Nav
- You got this!

## Gear Dropdown
- take a peek at javascript file
- html structure done for you examine it
- put partial inside icon
- position absolute and position relative
- position
- backgournd and border
- padding
- style editions section
- style help section
- style subtitles

## Custom Flexible Grid
- we are making flexible AATimes
- add html structure with corresponding classes up to sub-story and latest news/crosswrd/insider section
- copy in the content
- use classes and semantic html to categorize similarly styled content
- afterwards check your html with the solution
- 

## Content Styling
- style fonts and spacing for main story section
- style fonts and spacing for opinions section
- 


notes: fix gear-dropdown id to put on actual dropdown
(why did we decide to move language-nav to logo section)
