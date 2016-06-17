# Project Setup Checklist
Here it is. The ultimate rails/react setup checklist. Be advised, this checklist should only serve as a reminder. If you don't understand _why_ you are doing something on this list.. ask a TA!!

* [ ] rails new --> using postgres? skipping turbolinks?
* [ ] update your gemfile and run bundle install
  * better_errors
  * binding_of_caller
  * pry-rails
  * annotate
* [ ] npm init --yes --> create a package.json
* [ ] npm install --save
  * webpack
  * react
  * react-dom
  * react-router
  * flux
  * babel-core
  * babel-loader
  * babel-preset-react
  * babel-preset-es2015
* [ ] create a frontend folder and an entry point
* [ ] create a webpack.config.js file
  * be sure to include devtool: 'source-maps'
  * the entry point should be in frontend
  * the output directory should be app/assets/javascripts
* [ ] git init
  * Update your .gitignore (_don't skip this step!_)
    * node_modules/
    * bundle.js
    * bundle.js.map
  * first commit
