# Rainbow Routes

Today we're going to get our first experience using the React Router. The goal is to create a basic app that displays the colors of the rainbow. This rainbow, however, has something special about it - some of the colors are nested within others. Check out the [live demo][live-demo] to see how it should look. :rainbow:

## Getting Started

Download the [zip file][zip-skeleton] of the skeleton. Poke around to get familiar with the setup; it should look pretty familiar. **Run `npm install` to get it setup.**

### Routing

Now it's time to get to routing. Within `entry.jsx`, add all of the routes you'll need. Make sure they are properly nested so that the colors are organized correctly:

- red
  - orange
  - yellow
- green
- blue
  - indigo
- violet

Notice in the demo that there are two different ways of nesting routes. One makes it so that we must visit the parent component's path followed by the child's path (e.g. red > orange: `/red/orange`), while the other allows the child component's path to be independent (e.g. blue > indigo: `/indigo`). **Make sure to set these up differently!**

### Adding colors on click

Now that we have our routes down, we need to make our buttons to add colors actually change the URL and render different components. All of the click handlers have already been added for you; simply write the corresponding functions to change the URL and therefore the components that are rendered.

Time to celebrate! :tada: :rainbow: :tada:


[live-demo]: /
[zip-skeleton]: /../../questions/rainbow_routes/skeleton.zip
