# ReduxTodos

## Overview

In this project, you will create an app that lets people create and manage a todo list. Users of your app will be able to add items to their todo list, delete items from it, and mark items as either "done" or "not done."
Eventually, every item in the list will be able to have its own sub-list of "steps" that can be added, deleted, and marked as "done."

Similarly to the Redux Piano app, you will be using React and Redux on your frontend, but this project will also have a Rails backend so that every change made on the frontend will persist.

## Phase 0: Rails backend

Create a Rails app that stores Todos and serves JSON in response to HTTP requests.

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

## Phase 1: Frontend structure

Create a file system to structure your frontend, configure your npm packages and webpack, and test that your frontend configuration works. 

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
+ Run `npm install --save webpack react react-dom redux react-redux babel-core babel-loader babel-preset-react babel-preset-es2015` to set up React and Redux
  + this command installs the npm packages that we will be using to create our app` 
+ set up your `webpack.config.js` file so that your bundle.js ends up in `app/assets/javascripts`
  + run `webpack -w` to automatically compile your assets into `app/assets/javascripts/bundle.js` as you update them
+ set up your entry file (`redux_todos.jsx`) to render a message into your `#content` container
  + test this setup by viewing your page at `localhost:3000`

## Phase 2: Todos Redux structure

Create a Redux loop, including a store with reducers, action creators and constants, and middleware and API utils. This is how your frontend will get information from your backend, store it, and pass it to your frontend components.

### Store

The Redux Store will hold a reference to our application state. The Store will also handle updating our state when actions are dispatched and it will tell the necessary components to re-render.

+ create a new file, `/store/store.js`
+ import `createStore` from the redux library
+ import our `rootReducer` from `../reducers/root_reducer`

+ define a new function, `configureStore`
+ `configureStore` should return a new `Store` with the `rootReducer`

### Reducers

The reducers manage the shape of our application state.

We want to build a state that has the following shape:

```
{
  "1": {
    id: 1,
    title: "wash car",
    body: "with soap",
    done: false
  },
  "2": {
    id: 2,
    title: "wash dog",
    body: "with shampoo",
    done: true
  },
}
```

** Note that todo.id is the primary identifier **

#### TodoReducer

+ Create a file, `reducers/todo_reducer.js` that exports a reducing function. The function should accept two arguments:

  + `oldState` --> the previous application state.
  + `action` --> the action object being dispatched.

+ Remember that reducing functions should:

  + Never modify the oldState object
  + Return the default state if no arguments are passed
  + Return the oldState if the reducer doesn't care about the action

Let's start by just setting up our `TodoReducer` to return its default state:

```javascript
const TodoReducer = function(oldState = {}, action){
  switch(action.type){
    //...
    default:
      return oldState
  }
}

export default TodoReducer;
```

#### rootReducer

Create a new file, `reducers/root_reducer.js`. This file will be responsible for combining our multiple, domain-specific reducers. It will `export default` a single `rootReducer`.

  + Import `combineReducers` from `redux`

So far, our default application state looks like this:

```
{
  todos: {}
}
```

### Selectors

Selectors allow components to get pieces of the application state formatted in a specific way - I think of them as the application state's "views." We'll be writing a selector called `allTodos` to present the todos as an array, rather than as values in an object.

Selectors don't have to be long functions - I used `map` in conjunction with `Object.keys` for this function, and set a reasonable default of `[]`.

  + selectors

### Action Creators

+ action creators & constants

### Middleware



+ middleware

### API Utils

+ api utils

## Phase 3: Todos Components

Create React components to display your todo list and its items, as well as a form that allows users to create new items. 

+ root (provider)
+ app
+ `todo_list_container` & `todo_list`
+ `todo_list_item_container` & `todo_list_item`
  + `todo_detail_view_container` & `todo_detail_view`
+ `todo_form`

## Phase 4: Steps Redux structure

Create another Redux loop for "steps," the sub-items within a given todo.

+ store
  + reducers
  + selectors
+ action creators & constants
+ middleware
+ api utils

## Phase 5: steps components

Create React components to display the steps for a given todo list item, as well as a form that allows users to create new steps. (They will probably live in that item's TodoDetailView.)

+ `step_list_container` & `step_list`
+ `step_list_item_container` & `step_list_item`
+ `step_form`

## Bonus

+ style your site so that it looks presentable to VCs
  + potential inspiration: [trello]: https://trello.com/, [todoist]: https://todoist.com/, [google keep]: https://keep.google.com/, [any.do]: http://www.any.do/anydo/, [wunderlist]: https://www.wunderlist.com/
+ add additional features
  + tags for todos
  + steps can have sub-steps (polymorphic associations)
  + allow markdown or text styling in todos ([quill.js]: https://quilljs.com/)