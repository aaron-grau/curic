# Webpack Dev Server

As we begin to expand our frontend-only Javascript and React projects, two
problems arise:

* We will likely want to begin using a development server. It would be
beneficial to serve our project on the `localhost`, kind of like how `rails s`
served our Rails applications at `http://localhost:3000`. This would make it
possible to visit, say, `http://localhost:8080` to see our project without
having to open a given project's `index.html` in the browser.

* Using `webpack --watch` saves us a lot of time in development because it
automatically re-bundles our project when any of its files change, but we
still have to refresh the browser *after* `webpack` finishes the bundle.
Additionally, we might make the mistake of refreshing the browser *before*
`webpack` has finished. It would be even more efficient if each file change in
our project were to trigger an automatic browser refresh once the bundle is
complete.

Both of these problems are solved with `webpack-dev-server`. For all of our
frontend-only projects – the projects that don't use Rails – we will prefer to
use `webpack-dev-server` to make our lives a little easier. However, once we
begin projects that use JavaScript/React in addition to Rails, the configuration
required to use `webpack-dev-server` becomes very complex. For those projects,
it will suffice to have a `webpack --watch` running.

## Configuration

Assuming that you already have a `webpack.config.js` with an entry file and a
bundle properly included in your `index.html`, `webpack-dev-server` is very easy
to install.

1. Run `npm install --save webpack-dev-server`.
2. Add `"start": "webpack-dev-server --inline"` to your `package.json` like so:

```json
  "scripts": {
    "start": "webpack-dev-server --inline"
  }
```

Now when you run `npm start` your project should be served at
`http://localhost:8080`. If you change any files that are part of your project –
any files directly or indirectly imported in your entry file – the browser
should automatically refresh and display those changes.

*Note: Depending on your project's history, you may need to perform an initial
hard refresh (`command` + `shift` + `r`).*
