
# ReduxTodos
## Phase 0: rails backend

+ create a new rails project using `--database=postgresql` and `--skip-turbolinks`
+ update your gemfile with `better_errors`, `binding_of_caller`, `pry-rails`, and `annotate`
+ create a `Todo` model with `title`, `body`, and a boolean `done`
+ create a `TodosController` to handle API requests
  + nest under `api/` and call it `Api::TodosController`
  + it will need `index`, `create`, `update`, and `destroy` actions
  + don't forget that it will be serving JSON
+ create a `StaticPagesController` that will serve a `root` view with `<div id="content"></div>`
  + don't forget to update `routes.rb` to `root to: Staticpages#root`
+ start your server so that it can respond to HTTP requests

## Phase 1: frontend structure

+ create a `/frontend` folder at the root directory of your project to hold your frontend:
```
frontend
  + actions
  + components
  + middleware
  + reducers
  + store
  + util
  redux_todos.jsx
```
+ `npm install --save webpack react react-dom redux react-redux babel-core babel-loader babel-preset-react babel-preset-es2015`
  + this command installs the npm packages that we will be using to create our app` 
+ set up your `webpack.config.js` file so that your bundle.js ends up in `app/assets/javascripts`
  + run `webpack -w` to automatically compile your assets into `app/assets/javascripts/bundle.js` as you update them
+ set up your entry file (`redux_todos.jsx`) to render a message into your `#content` container
  + test this setup by viewing your page at `localhost:3000`

## Phase 2: todos redux structure

+ store
+ reducers
+ action creators & constants
+ middleware
+ api utils

## Phase 3: todos components

+ root (provider)
+ app
+ `todo_list_container` & `todo_list`
+ `todo_list_item_container` & `todo_list_item`
+ `todo_form`
+ `todo_detail_view_container` & `todo_detail_view`

## Phase 4: steps redux structure

## Phase 5: steps components

## Bonus

+ style your site so that it looks presentable to VCs
  + potential inspiration: [trello]: https://trello.com/, [todoist]: https://todoist.com/, [google keep]: https://keep.google.com/, [any.do]: http://www.any.do/anydo/, [wunderlist]: https://www.wunderlist.com/
+ add additional features
  + tags for todos
  + steps can have sub-steps (polymorphic associations)
  + allow markdown or text styling in todos ([quill.js]: https://quilljs.com/)