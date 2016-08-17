# Project Setup Checklist
Here's a Rails/React/Redux setup checklist. It should only serve as a reminder.
Ask a TA if you don't understand _why_ you're configuring something on this
list.

* [ ] `rails new`
  * Add `--database=postgresql` if using Postgres.
  * Add `--skip-turbolinks` to skip the turbolinks gem.
* [ ] Update your Gemfile.
  * `better_errors`
  * `binding_of_caller`
  * `pry-rails`
  * `annotate`
* [ ] `bundle install`
* [ ] `npm init --yes` to create a package.json file with the default setup.
* [ ] `npm install --save`
  * `webpack`
  * `react`
  * `react-dom`
  * `react-router`
  * `redux`
  * `react-redux`
  * `babel-core`
  * `babel-loader`
  * `babel-preset-react`
  * `babel-preset-es2015`
* [ ] Create a frontend folder at the root of your project with an entry file inside of it.
* [ ] Create a webpack.config.js file.
  * Include `devtool: 'source-maps'`.
  * The entry point should be in frontend, e.g. `entry: './frontend/index.jsx'`.
  * The output path should be `'app/assets/javascripts'`.
* [ ] `git init`
  * Update your .gitignore (_don't skip this step!_).
    * `node_modules/`
    * `bundle.js`
    * `bundle.js.map`
  * Commit and push
