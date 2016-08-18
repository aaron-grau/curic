# React / Flux Curriculum

## w7d1

### Video Lectures (94 min)
[**An Important Note About These Lectures**][video_deprecation_note]

:closed_lock_with_key: `go_video_go`
- :movie_camera: [Part 1: Intro to React][react_video_01] (5 min)
- :movie_camera: [Part 2: Anatomy/Physiology of Components][react_video_02] (15 min)
- :movie_camera: [Part 3: Rendering Components in the Browser][react_video_03] (10 min)
- :movie_camera: [Part 4: JSX][react_video_04] (7 min)
- :movie_camera: [Part 5: Babel/Transpiling JSX][react_video_05] (6 min)
- :movie_camera: [Part 6: The Grand Demo][react_video_06] (51 min)
  - :computer: [demo source code][watch-demo]

### Readings

#### ES6 & Lodash (25 min)
- [ES6 Syntax: Object Destructuring][object_destructuring] (10 min)
- [ES6 Syntax: Import / Export][import_export] (10 min)
- [Lodash][lodash] (5 min)

#### Intro to React and JSX (25 min)
- [React][intro_to_react] (5 min)
- [JSX][intro_to_jsx] (10 min)
- [React Components][intro_to_react_components] (10 min)

#### Components in Detail (30 min)
-	[Declaration][component_declaration] (10 min)
- [Props and State][props_and_state] (10 min)
- [Lifecycle Methods][component_lifecycle] (5 min)
- [Synthetic Events][synthetic_events] (5 min)

#### Configuration (35 min)
- [NPM][npm_configuration] (15 min)
- [Webpack][webpack_configuration] (10 min)
- [Babel][babel_configuration] (10 min)

### Homeworks (60 min)
- [Getting Started with NPM][getting_started] (30 min)
- [React Calculator][react_calculator] (30 min)

### Projects

- [Widgets][widgets]
- [Minesweeper][minesweeper]

### Additional Resources

- [Official React Documentation][react_docs]
	- Most Helpful: 'REFERENCE' Section (Left Sidebar)

[video_deprecation_note]: readings/video_deprecation_note.md
[react_video_01]: https://vimeo.com/album/3686654/video/147897911
[react_video_02]: https://vimeo.com/album/3686654/video/147899305
[react_video_03]: https://vimeo.com/album/3686654/video/147900089
[react_video_04]: https://vimeo.com/album/3686654/video/147900661
[react_video_05]: https://vimeo.com/album/3686654/video/147900472
[react_video_06]: https://vimeo.com/album/3686654/video/147900885
[watch-demo]: demos/watch_webpack_demo

[import_export]: readings/import_export.md
[object_destructuring]: readings/object_destructuring.md
[intro_to_react]: readings/intro_to_react.md
[intro_to_jsx]: readings/intro_to_jsx.md
[intro_to_react_components]: readings/intro_to_react_components.md
[props_and_state]: readings/props_and_state.md
[component_declaration]: readings/component_declaration.md
[component_lifecycle]: readings/component_lifecycle.md
[synthetic_events]: readings/synthetic_events.md
[npm_configuration]: readings/npm_configuration.md
[webpack_configuration]: readings/webpack_configuration.md
[babel_configuration]: readings/babel_configuration.md
[lodash]: readings/lodash.md

[getting_started]: homeworks/getting_started
[react_calculator]: homeworks/questions/calculator.md

[widgets]: projects/widgets
[minesweeper]: projects/react_minesweeper

[react_docs]: https://facebook.github.io/react/docs/getting-started.html

## w7d2

### Readings (90 min)

- [Flux and Redux Intro][flux_redux] (10 min)
- [Store][store] (15 min)
- [Reducers][reducers] (15 min)
- [Actions][actions] (10 min)
- [`<Provider/>`][provider] (15 min)
- [`connect()`][connect] (15 min)
- [Containers][containers] (10 min)

### Homeworks

### Projects

- [Synthesizer][synthesizer]

### Additional Resources
*Note: The 'API' sections are especially useful.*
- [Official `redux` Documentation][redux_docs]
- [Official `react-redux` Documentation][react_redux_docs]

[store]: readings/store.md
[reducers]: readings/reducers.md
[actions]: readings/actions.md
[flux_redux]: readings/flux_redux.md
[provider]: readings/provider.md
[connect]: readings/connect.md
[containers]: readings/containers.md
[redux_docs]: http://redux.js.org/index.html
[react_redux_docs]: https://github.com/reactjs/react-redux/blob/master/docs/

[synthesizer]: projects/synthesizer

## w7d3

### Video Lectures

### Readings

- [Higher-order functions][higher_order_functions]
- [Middleware][middleware]
- [API Interactions in Redux][redux_api_interactions]

### Homeworks

### Projects

- [Todos][todos]

[higher_order_functions]: readings/higher_order_functions.md
[middleware]: readings/middleware.md
[redux_api_interactions]: readings/redux_api_interactions.md
[todos]: projects/todos


## w7d4

### Video Lectures

### Readings

- [Intro to react router][react-router-intro] (12 min)
- [Route Configuration][route-configuration] (12 min)
- [Route Matching][route-matching] (5 min)
- [Index Routes][index-routes] (7 min)
- [Route Hooks (`onEnter`)][on-enter]
- [`withRouter`][with-router]
- [Jbuilder][jbuilder] (20 min)

### Homeworks

### Projects

- [Pokedex][pokedex]

### Additional Resources

-	[React Router Documentation][react-router-docs]
	- Check the `API` docs for quick reference

[react-router-intro]: https://github.com/reactjs/react-router/blob/master/docs/Introduction.md
[route-configuration]: https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md
[route-matching]: https://github.com/reactjs/react-router/blob/master/docs/guides/RouteMatching.md
[index-routes]: https://github.com/reactjs/react-router/blob/master/docs/guides/IndexRoutes.md
[with-router]: https://github.com/reactjs/react-router/blob/master/docs/API.md#withroutercomponent
[on-enter]: readings/on_enter.md
[jbuilder]: https://github.com/rails/jbuilder
[pokedex]: projects/pokedex
[react-router-docs]: https://github.com/reactjs/react-router/blob/master/docs/

## w7d5

### Video Lectures

### Readings
-	[React Map Demo][react_map_demo] (15 min)
- [`preloadedState`][preloaded-state]
- [User Authentication]
- [Bonus: React Context][context]
- [Bonus: `localStorage`][local-storage]

### Homeworks

### Projects

- [BenchBNB][bench-bnb]

### Additional Resources

- [Rails/React/Redux Configuration Checklist][checklist]

[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[context]: https://facebook.github.io/react/docs/context.html
[preloaded-state]: readings/preloaded_state.md
[react_map_demo]: demos/react_map_demo
[checklist]: readings/checklist.md
[bench-bnb]: projects/bench_bnb

## w7d6-w7d7

### Readings (50 min)
* [Think in React][think-in-react] (20 min)

### Homework (5 hours)
* Submit your [full-stack project proposal][full-stack-project-proposal] (5 hours)
  * **Due by 9am on Monday**

### Additional Resources
* See [full-stack project curriculum][full-stack-project-curriculum] for additional information and readings related to full-stack projects.

[full-stack-project-curriculum]: ../full-stack-project
[full-stack-project-proposal]: ../full-stack-project/readings/full-stack-project-proposal.md

## w8d1

**Project Proposal Review Period for Instructional Staff**
### Homework (1 hour)
* Do the auth part of A04 Prep
  * Frontend auth (the main concept in BenchBnB Day 2) builds on top of regular Rails backend auth, so make sure you build on a solid base.
  * You'll be surprised how much of it you've forgotten by now. It's normal.

### Projects
* **Solo:** [BenchBnB Day 2][bench-bnb2]

[bench-bnb2]: projects/bench_bnb
