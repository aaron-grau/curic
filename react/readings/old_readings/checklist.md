# Project Setup Checklist
Here it is. The ultimate rails/react setup checklist. Be advised, this checklist should only serve as a reminder. If you don't understand _why_ you are doing something on this list.. ask a TA!!

* [ ] rails new
  * add `--database=postgresql` if using Postgres
  * add `--skip-turbolinks` to skip turbolinks gem
* [ ] update your Gemfile
  * better_errors
  * binding_of_caller
  * pry-rails
  * annotate
* [ ] bundle install
* [ ] npm init --yes to create a package.json file with the default setup
* [ ] npm install --save
  * webpack
  * react
  * react-dom
  * react-router
  * redux
  * react-redux
  * babel-core
  * babel-loader
  * babel-preset-react
  * babel-preset-es2015
* [ ] create a frontend folder at the root of the project and create an entry file inside of it
* [ ] create a webpack.config.js file
  * include devtool: 'source-maps'
  * the entry point should be in frontend, e.g. entry: './frontend/index.jsx')
  * the output path should be 'app/assets/javascripts'
* [ ] git init
  * Update your .gitignore (_don't skip this step!_)
    * node_modules/
    * bundle.js
    * bundle.js.map
  * first commit and push
