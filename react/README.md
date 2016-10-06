# React / Redux Curriculum

## w7d1
### Video Lectures (94 min)
**N.B.** These lectures were recorded prior to the introduction of ES6-style syntax to
React. As a result, you may see a slightly different syntax than in the rest of
the React curriculum materials. Review the
[component declaration][component-declaration] reading for more discussion of the differences.

:closed_lock_with_key: `go_video_go`
- :movie_camera: [Part 1: Intro to React][react_video_01] (5 min)
- :movie_camera: [Part 2: Anatomy/Physiology of Components][react_video_02] (15 min)
- :movie_camera: [Part 3: Rendering Components in the Browser][react_video_03] (10 min)
- :movie_camera: [Part 4: JSX][react_video_04] (7 min)
- :movie_camera: [Part 5: Babel/Transpiling JSX][react_video_05] (6 min)
- :movie_camera: [Part 6: The Grand Demo][react_video_06] (51 min)
  - :computer: [demo source code][watch-demo]

### Readings (115 min)
#### Configuration (35 min)
- [NPM][npm_configuration] (15 min)
- [Webpack][webpack_configuration] (10 min)
- [Babel][babel_configuration] (10 min)

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

### Homeworks (60 min)
- [Getting Started with NPM][getting_started] (30 min)
- [React Calculator][react_calculator] (30 min)

### Projects
- [Widgets][widgets]
- [Minesweeper][minesweeper]

### Additional Resources
- [Official React Documentation][react_docs]
	- Most Helpful: REFERENCE Section (Left Sidebar)

[component-declaration]: readings/component_declaration.md
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

### Readings (105 min)
- [Flux and Redux Intro][flux_redux] (10 min)
- [Store][store] (25 min)
- [Reducers][reducers] (15 min)
- [Actions][actions] (10 min)
- [`<Provider/>`][provider] (15 min)
- [`connect()`][connect] (15 min)
- [Containers][containers] (10 min)

### Fruit Stand App Demo (1 hr 15 min)
+ Phase I - Redux only (15 min)
  + [Live demo][fruit-stand-01-live]
  + [Source code][fruit-stand-01-source]
+ Phase II - React/Redux (1 hr)
  + :movie_camera: [Video demo][fruit-stand-02-video] (45 min)
    + :closed_lock_with_key: `go_video_go`
  + [Live demo][fruit-stand-02-live]
  + [Source code][fruit-stand-02-source]

### Homeworks (45 min)
- [Dollar Store][dollar_store_hw] (45 min)

### Projects
- [Synthesizer][synthesizer]

### Additional Resources
- [Official `redux` Documentation][redux_docs]
- [Official `react-redux` Documentation][react_redux_docs]
  -	*Note: The 'API' sections are especially useful.*

[store]: readings/store.md
[reducers]: readings/reducers.md
[actions]: readings/actions.md
[flux_redux]: readings/flux_redux.md
[provider]: readings/provider.md
[connect]: readings/connect.md
[containers]: readings/containers.md
[redux_docs]: http://redux.js.org/index.html
[react_redux_docs]: https://github.com/reactjs/react-redux/blob/master/docs/

[fruit-stand-01-live]: http://appacademy.github.io/curriculum/react/fruit_stand_01/index.html
[fruit-stand-01-source]: ./demos/fruit_stand_demos/fruit_stand_01
[fruit-stand-02-video]: https://vimeo.com/184374712
[fruit-stand-02-live]: http://appacademy.github.io/curriculum/react/fruit_stand_02/index.html
[fruit-stand-02-source]: ./demos/fruit_stand_demos/fruit_stand_02

[dollar_store_hw]: homeworks/questions/stores.md

[synthesizer]: projects/synthesizer

## w7d3

### Readings (60 min)
- [Higher-order functions][higher_order_functions] (15 min)
- [Middleware][middleware] (15 min)
- [API Interactions in Redux][redux_api_interactions] (15 min)
- [Selectors][selectors] (10 min)
- [Object.freeze][obj-freeze] (15 min)

### Homework (45 min)
- [Middleware Homework][middleware_homework] (45 min)
- [Submit tentative project proposal][tentative-proposal]
  -	due w7d4 9AM

### Projects
- [Todos][todos]

[obj-freeze]: readings/object_freeze.md
[selectors]: readings/selectors.md
[tentative-proposal]: ../full-stack-project/readings/tentative-project-proposal.md
[higher_order_functions]: readings/higher_order_functions.md
[middleware]: readings/middleware.md
[redux_api_interactions]: readings/redux_api_interactions.md
[middleware_homework]: homeworks/questions/middleware.md
[todos]: projects/todos


## w7d4

### Readings (75 min)
- [Intro to react router][react_router_intro] (12 min)
- [Route Configuration][route_configuration] (12 min)
- [Route Matching][route_matching] (5 min)
- [Index Routes][index_routes] (7 min)
- [Route Hooks (`onEnter`)][on_enter] (10 min)
- [`withRouter`][with_router] (9 min)
- [Jbuilder][jbuilder_docs] (20 min)

### Homeworks (30 min)
- [Rainbow Routes][rainbow_routes]

### Projects
- [Pokedex][pokedex]

### Additional Resources
-	[React Router Documentation][react_router_docs]
	- Check the `API` docs for quick reference

[react_router_intro]: https://github.com/reactjs/react-router/blob/master/docs/Introduction.md
[route_configuration]: https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md
[route_matching]: https://github.com/reactjs/react-router/blob/master/docs/guides/RouteMatching.md
[index_routes]: https://github.com/reactjs/react-router/blob/master/docs/guides/IndexRoutes.md
[with_router]: https://github.com/reactjs/react-router/blob/master/docs/API.md#withroutercomponent-options
[on_enter]: readings/on_enter.md
[jbuilder_docs]: https://github.com/rails/jbuilder
[rainbow_routes]: homeworks/questions/rainbow_routes.md
[pokedex]: projects/pokedex
[react_router_docs]: https://github.com/reactjs/react-router/blob/master/docs/

## w7d5

### Readings (28 min)
-	[React Map Demo][react_map_demo] (15 min)
- [`preloadedState`][preloaded_state] (3 min)
- [User Authentication][user_authentication] (10 min)

### Additional Resources
- [Rails/React/Redux Configuration Checklist][checklist]
- [React Context][context]
- [`localStorage`][local_storage]

### Homeworks (100 min)
* [jBuilder][jbuilder_homework] (40 min)
* Do the auth part of [A04 Prep][a04_prep] (1 hr)
  * Frontend auth (the main concept in BenchBnB Day 1) builds on top of regular Rails backend auth, so make sure you build on a solid base.
  * You'll be surprised how much of it you've forgotten by now. It's normal.

### Projects
- **Solo:** [BenchBNB][bench_bnb]

### :joy_cat: **Happy Hour!** :joy_cat:

[local_storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[context]: https://facebook.github.io/react/docs/context.html
[preloaded_state]: readings/preloaded_state.md
[react_map_demo]: demos/react_map_demo
[checklist]: readings/checklist.md
[jbuilder_homework]: homeworks/questions/jbuilder.md
[bench_bnb]: projects/bench_bnb
[user_authentication]: readings/front_end_auth.md

## w8d1

**Project Proposal Review Period for Instructional Staff**

### Readings (20 min)
* [Think in React][think_in_react] (20 min)

### Homework (5 hrs)
* Submit your [full-stack project proposal][full_stack_project_proposal] (5 hrs)
  * **Due by 9am on Monday**

### Projects
* **Solo:** [BenchBnB Day 2][bench_bnb]

### Additional Resources
* See [full-stack project curriculum][full_stack_project_curriculum] for additional information and readings related to full-stack projects.


[think_in_react]: https://facebook.github.io/react/docs/thinking-in-react.html
[full_stack_project_curriculum]: ../full-stack-project
[full_stack_project_proposal]: ../full-stack-project/readings/full-stack-project-proposal.md
[a04_prep]: https://github.com/appacademy/assessment-prep#assessment-4
