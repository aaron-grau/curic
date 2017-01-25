# Performance and Scaling

Performance and scaling are two very common interview topics. Being able to
relate questions about them back to your FSP is a great way to demonstrate
your command of React and Rails. Below are some resources to get you started
building a faster site.

## React

### Measuring Performance

React provides a number of benchmarking tools that allow us to identify
wasteful DOM manipulation. It's possible to use the `Perf` object from
the `react-addons-perf` library to identify time spent on components that
haven't changed what they render with `Perf.printWasted()`. `printOperations()`
provides a list of underlying DOM manipulations made over a given period of time.

* [React docs on `Perf`][perf-docs]
* [An introduction to `Perf`][perf-debugging]
* [Benchmarking examples using `Perf`][perf-examples]

[perf-docs]: https://facebook.github.io/react/docs/perf.html
[perf-debugging]: http://benchling.engineering/performance-engineering-with-react/
[perf-examples]: http://benchling.engineering/deep-dive-react-perf-debugging/

### Managing updates efficiently

Despite the efficiency of React's diffing algorithm in determining what components
to update, it's sometime necessary to supplement that functionality with React's
`shouldComponentUpdate` lifecycle method. `shouldComponentUpdate` allows us to
limit the circumstances in which a given component renders.

* [`shouldComponentUpdate` docs][should-component-update-docs]
* [Examples using `shouldComponentUpdate`][should-component-update-explanation]

[should-component-update-docs]: https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
[should-component-update-explanation]: https://facebook.github.io/react/docs/optimizing-performance.html#shouldcomponentupdate-in-action

### Code splitting with `react-router` and `webpack`

The `bundle.js` file can be very large and result in slow load times when
a user first navigates to your site. Our old friend Webpack provides an
opt-in feature called code splitting that allows javascript to be
dynamically loaded based on what's being rendered in the user's
current page. In order to take advantage of Webpack's code splitting
functionality, you'll need to integrate it with the `react-router`. This
way javascript files are only loaded upon navigation to certain URLs.

* [Webpack docs on code splitting][webpack-docs]
* [React Router docs on code splitting][react-router-webpack]

[webpack-docs]: https://webpack.github.io/docs/code-splitting.html
[react-router-webpack]: https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md

### Rendering separation (or windowing)

While code splitting allows us to get around having to make the browser handle
an overly large `bundle.js` file, that still leaves us with potentially unnecessary
rendering of complex elements on the user's current page. For instance, if at all
possible we want to avoid rendering elements at the bottom of the page until the
user scrolls and those components come into view. Just think of how [Netflix renders movie
lists as you scroll down, but not before that][netflix-blog-post].

While you can roll your own windowing functionality, there are
also a number of excellent NPM packages out there that can quickly be integrated
with your app. One particularly popular package for rendering large lists is
`react-virtualized`.

* [`react-virtualized` npm module][react-virtualized]
* [Talk on windowing and `react-virtualized`][react-windowing-talk]

[netflix-blog-post]: http://techblog.netflix.com/2015/08/making-netflixcom-faster.html
[react-virtualized]: https://github.com/bvaughn/react-virtualized
[react-windowing-talk]: https://bvaughn.github.io/connect-tech-2016/#/0/0

## Rails

### Caching with Redis

Using a tool like Redis can speed up data-intensive SQL queries on the backend by
holding data-sets in memory for fast retrieval. Redis can be used to store
recently queried data, effectively caching it so later requests for that data
never hit the database, but are instead served by Redis.

* [Caching in Rails][rails-caching]
* [Caching with Redis in Rails][redis-caching]
* [Caching railscasts][railscasts-caching]

[rails-caching]: https://github.com/appacademy/curriculum/blob/master/full-stack-project/readings/caching.md
[redis-caching]: https://github.com/appacademy/curriculum/blob/master/full-stack-project/readings/redis.md
[railscasts-caching]: https://github.com/appacademy/curriculum/blob/master/full-stack-project/readings/caching-railscasts.md

## More resources


* [Site Performance][performance]
* [Design patterns][design-patterns]
* [Performance][yahoo-performance]
* **Tool**: [Google's PageSpeed Insights][pagespeed]
* **Bonus: Front-end Performance Resources**: [jankfree.org][jankfree]

[performance]: http://developer.yahoo.com/performance/rules.html
[design-patterns]: https://github.com/appacademy/curriculum/blob/master/full-stack-project/readings/design_patterns.md
[yahoo-performance]: https://developer.yahoo.com/performance/rules.html
[pagespeed]: https://developers.google.com/speed/pagespeed/insights/
[jankfree]: http://jankfree.org/
