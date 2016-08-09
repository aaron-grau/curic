# ReduxTodos

## Overview

In this project, you will create an app that lets people create and manage a todo list. Users of your app will be able to add items to their todo list, delete items from it, and mark items as either "done" or "not done."
Eventually, every item in the list will be able to have its own sub-list of "steps" that can be added, deleted, and marked as "done."

Today's project uses the React/Redux frontend that you used on the Redux Piano app yesterday. However, this project will also have a Rails backend so that every change made on the frontend will persist.

## Phase 0: Rails backend

In this phase you will create a Rails app that stores Todos and serves JSON in response to HTTP requests.

+ Create a new rails project using `--database=postgresql` and `--skip-turbolinks`
  + Update your gemfile with `better_errors`, `binding_of_caller`, `pry-rails`, and `annotate`
+ Create a `Todo` model with `title`, `body`, and a boolean `done`
+ Create a `TodosController` to handle API requests
  + Nest your routes under `api/` and call your controller `Api::TodosController`
  + Your controller will need `index`, `create`, `update`, and `destroy` actions
  + Make your controller actions serve JSON-formatted responses
+ Create a `StaticPagesController` that will serve a `root` view with `<div id="content"></div>`
  + Don't forget to update `routes.rb` to `root to: Staticpages#root`
+ Start your server so that it can respond to HTTP requests

** Test your API: Try out your API endpoints using Postman. You should be able to send `POST`, `GET`, `PATCH`, and `DELETE` requests and receive appropriate responses. **

## Phase 1: Frontend structure

In this phase you will create a file system to structure your frontend, configure your npm packages and webpack, and test that your frontend configuration works.

+ Create a `/frontend` folder at the root directory of your project:
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
  + This command installs the npm packages that we will be using to create our app` 
+ Set up your `webpack.config.js` file so that your bundle.js ends up in `app/assets/javascripts`
  + Run `webpack -w` to automatically compile your assets into `app/assets/javascripts/bundle.js` as you update them

** Test your setup: Set up your entry file (`redux_todos.jsx`) to render an `<h1>it worked</h1>` into your `#content` container. You should be able to visit `localhost:3000` and confirm that you can see that `it worked`. **

## Phase 2: Todos Redux structure

In this phase you will create a Redux loop, including a store with reducers, action creators and constants, and middleware and API utils. This is how your frontend will get information from your backend, store it, and pass it to your frontend components.

### Store

The Redux Store will hold a reference to our application state. The Store will also handle updating our state when actions are dispatched and it will tell the necessary components to re-render.

+ create a new file, `/store/store.js`
+ import `createStore` from the redux library
+ import our `rootReducer` from `../reducers/root_reducer`

+ define a new function, `configureStore`
+ `configureStore` should return a new `Store` with the `rootReducer`

### Reducers

The reducers manage the shape of our application state.

We want to build a state that allows us to easily add, remove, and update todos. In a hash, we get O(1) querying, updating, and deleting if we know the id - in an array, all of these operations would be O(n). Therefore, we'll be using the following shape:

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

  + Never modify the `oldState` object
  + Return the default state if no arguments are passed
  + Return the `oldState` if the reducer doesn't care about the action

** N.B. ** You can use [`Object.freeze`][object.freeze] to prevent yourself from accidentally mutating the `oldState`.

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
  + Import your `TodoReducer` function as `TodoReducer`
  + Create a `rootReducer` using `combineReducers`

So far, our default application state looks like this:

```js
{
  todos: {}
}
```

### Selectors

Selectors are "getter" methods for the application state. They often return a subset of the state data formatted in a specific way. 

+ Write a selector called `allTodos` to present the todos as an array, rather than as values in an object.

** N.B. ** Selectors don't have to be long functions - a one-line function that uses `map` in conjunction with `Object.keys` and sets a reasonable default of `[]` would work just fine.

### Action Creators

Now you'll write the code that creates the `actions` that tell your `TodoReducer` how to update the state.

Now let's write a couple action creators. The first one will request `todos` from the backend, and the second one will receive the requested `todos`.

Remember that: 
  + `action` objects are plain-old javascript objects that also have a `type` property.
  + Action creators don't directly interact with `Middleware` or the `Store`; they just produce objects. We then send those objects through our `Middleware` and to the `Store` by invoking `Store#dispatch`.

#### `requestTodos`

In order to request `todos` from the backend, we need to send a `GET` request to the appropriate URL. We don't need to pass any information in order for this request to succeed, so the `action` that triggers this event will only need the appropriate `type` (`REQUEST_TODOS`).

#### `receiveTodos`

This action lets our state know to reset its list of `todos` and, as such, will also need to pass along a new set of `todos`. Therefore, our `receiveTodos` action creator should accept an argument `todos` and return an `action` with `type` `RECEIVE_BENCHES` and a `todos` property that represents all of our todo data.

#### Constants

We use constants to represent `actionTypes`. They are used whenever `actionTypes` are being set or read (i.e., in our action creators and in the `switch` statements in our reducers and middleware).

+ Create and export constants both for `REQUEST_BENCHES` and `RECEIVE_BENCHES`.
  + `export const REQUEST_BENCHES = "REQUEST_BENCHES";`

Don't forget to export both of the functions you just made, as well as the constants we created!

### Middleware

#### TodoMiddleware

Our `TodoMiddleware` will be responsible for triggering the api calls that populate our `Store` with `todos`. Remember, Middleware receives dispatches before the store. It can decide to intercept the dispatch, trigger another dispatch, or simply pass on it and do nothing.

+ Create a file `middleware/todo_middleware.js`
+ Import the relevant constants from your `todo_actions` file
+ Refer to the [Middleware][middleware_reading] reading and set up the basic structure of a redux middleware function
+ Implement a `switch` statement on `action.type` with a `default` that simply calls `next` with the `action` given to it
+ Now let's add a `case` for `REQUEST_BENCHES` that `console.log`s "here is where todos would be fetched"
+ Export your `TodoMiddleware`

#### MasterMiddleware

`MasterMiddleware` is similar to the `rootReducer` that we implemented earlier in that this object will collect at least one middleware function and connect it to our `Store`.

The pattern for implementing it is relatively simple:

+ Create a file `middleware/master_middleware.js`
+ Import `applyMiddleware` from `redux`
+ Import your `TodoMiddleware`
+ Use the `applyMiddleware` function to create a `MasterMiddleware`
+ Export your `MasterMiddleware` 

Now that you've created a `MasterMiddleware`, add it to your `createStore` function in `store/store.js`

** Test this out by setting `window.Store = Store` and `window.requestTodos = requestTodos` in your entry file. Then, run `Store.dispatch(requestBenches())` in your browser console - you should see the logged statement in your console. **

### API Utils

Your API utilities are what actually make the `$.ajax` requests that will hit your backend and fetch or (eventually) update your data. They are called by your middleware, and the data they receive is passed on to the store. In general, these utility functions will accept two arguments: a callback to run if the request is successful, and a callback to run in case of an error.

+ Create a file `util/todo_api_util.js`
+ Write a function that accepts a `success` argument and passes that function as the success callback to a `$.ajax` call

Your function should look something like the following:
```javascript
export const fetchTodos(success, error){
  $.ajax({
    method: // ,
    url: //,
    success,
    error
  })
}
```  

#### Using API Utils in Middleware

Let's adjust our middleware so that it calls this new utility function if the `actionType` matches `REQUEST_TODOS`.

+ Start by importing `fetchTodos`
+ Invoke `fetchTodos` in your `switch` statement instead of `console.log`ging

Your code should look similar to the following:
```javascript
export default ({getState, dispatch}) => next => action => {
  switch(action.type){
    case REQUEST_TODOS:
      const success = data => console.log(data);
      fetchTodos(success);
      break;
    default:
      next(action);
  }
};
```

** Test your code: running `Store.dispatch(requestTodos())` in your console should prompt a `console.log` of all your `todo` data! **

Once the above test works, update your middleware so that it dispatches the received data as part of an action instead of `console.log`ging it.

+ Import the `receiveTodos` action creator
+ Redefine your `success` callback to dispatch a `RECEIVE_TODOS` action 

#### Receiving and Reducing data

Now that you're `fetch`ing data from your backend and `dispatch`ing it to your `Store` with an `actionType` of `RECEIVE_TODOS`, it's time to tell your reducers what to do with that type of action.
Remember to import the appropriate constants! Your code will now probably look similar to the following:

```javascript
const TodoReducer = function(oldState = {}, action){
  switch(action.type){
    case RECEIVE_TODOS:
      return action.todos;
    default:
      return oldState;
  }
};
```

** Test your code! You should now be able to run the following in the console: **
```javascript
Store.getState(); // --> returns default state object
Store.dispatch(requestTodos());
Store.getState(); // --> returns a new state object, fully populated!
```

Examine your state object - is it the shape you had decided it should be back in the `Reducers` section? Specifically, are the `todos` being stored as values in an object?

** You've now implemented a full Redux cycle - call over a TA for a code review **

## Phase 3: Todos Components

Create React components to display your todo list and its items 

### Root

The `Root` component serves to wrap your `App` component with a `Provider`. The `Provider` gives all of your components access to your `Store`, allowing them to read the application state and dispatch actions.

+ Create a file `components/root.jsx`
+ Import React and the `react-redux` `Provider`
+ Even though you haven't written your `App` component yet, import it
+ This component can be a functional component, receiving (and destructuring) its props (your `Store`) as an argument, and returning a block of `jsx` code.

Your `Root` should look like the following:
```javascript
const Root = ({store}) => (
  <Provider store={store}>
    <App/>
  </Provider>
);
```

Don't forget to update your entry file to render your `Root` component into `#content`!

### App

This component will hold all of the top-level concerns of your app. A top-level concern is a feature of the app that functions on its own and as such is not nested under any other features. In this case, that will only be the TodoList, but nonetheless it's a good design pattern to get used to.

Your `App` component can also be functional, because it doesn't need to use any of React's lifecycle hooks. Because it doesn't rely on any of its props, the component doesn't need to receive any arguments.

** Test your code: make your `App` component return an `h1` tag with the name of your app. You should be able see your app's name appear on the page. **

### TodoList

This component will show the items in our todo list. 

** N.B. ** Because we're using the react/redux design principle of separating container and presentational components, this will actually be two components!

#### TodoListContainer

The goal of a container component is to allow the presentational component to be as simple and lightweight as possible. To this end, we map the application state and the `Store`'s dispatch to a set of props that get passed to the presentational component.

Refer to the [components][components_reading] and [connect][connect_reading]reading if you need a refresher on container components.

+ Create a file `components/todo_list_container.js`
+ Import both the `connect` function and the (as of yet unwritten) `TodoList` presentational component
+ Create `mapStateToProps` and `mapDispatchToProps` functions for your `TodoList` component
  + Use the `allTodos` selector you created to give this component access to a list of todos
  + Use the `fetchTodos` action you created to allow this component to dispatch an action to load todos from the database
+ Pass your `mapStateToProps` and `mapDispatchToProps` functions to `connect`
+ Call this `connect` function with your `TodoList` component as an argument
+ Export the result of that function call

#### TodoList

If we've done our job with our container component, all this presentational component will have to do is:

+ dispatch a `fetchTodos` action on `componentDidMount`
+ render the `todos` information passed to it as props

** Test your code: reload your app and see a list of `todo`s! **

** N.B. ** You may want to consider creating another component, `TodoListItem`, to further simplify your `TodoList` component.

## Phase 4: TodoForm

In this phase you will create a form that allows users to create new todo items.

You've already set up a redux cycle - now it's time to flesh it out so that a user can create todo list items. You will need to:

+ Create new action creator methods (in `actions/todo_actions`)
+ Create a new API utility helper function (in `util/todo_api_util`) that sends `POST` requests to create a todo list item
+ Add new `case`s to your middleware's `switch` statement that use your new API utility function 
+ Add new `case`s to your reducer's `switch` statement that handle the reception of a newly created todo list item
+ Create a new component (`components/todo_form`) that dispatches actions with your new `actionType`s
  + Render this component in your `TodoList` component
+ Update your `TodoListContainer` to pass in the props that your `TodoForm` will need

** Test your code: try creating a new todo list item using your form. Does it appear on your page? Call over a TA for a code review **

## Phase 5: Updating and Deleting Todos

In this phase, you will add new actions and buttons so that you can mark `todo`s as `done` or `undone` as well as delete them. This will require you to:

+ Create new action creator methods (in `actions/todo_actions`)
+ Create new API utility helper functions (in `util/todo_api_util`) that `PATCH` or `DELETE` a todo list item
+ Add new `case`s to your middleware's `switch` statement that use your new API utility functions
+ Add a new `case` to your reducer's `switch` statement that handles the deletion of a todo list item
  + Your `case` that receives a newly created todo list item should work for `PATCH`ed items as well
+ Disable the button while the dispatch is pending

## Phase 6: Steps Redux structure

### Refactoring and setup

In this phase you will update your app so that each todo list item can have its own sub-list of `steps`. You will need to build out your backend, your redux cycle, as well as add several new components for this to work.

Let's start by getting your `TodoListItem`s ready for their own sub-lists by refactoring their display into multiple parts - one part, the top-level `TodoListItem`, will now hold another part, a `TodoDetailView`. The `TodoDetailView` should hold everything about the todo list item other than its title and a button to change its current status, and will eventually hold a `StepList` component that will hold all of the `Steps` for a given `TodoListItem`. Eventually we will wrap the `TodoDetailView` in a container component so that it can dispatch functions and receive information from the `Store`.

### Redoing Rails

Create a new set of API endpoints that will serve `Steps` (each with a `title`, a `todo_id`, and a boolean `done` value) as JSON. You should be able to do this with very little instruction.

### Redoing Redux

Create another Redux cycle for `Steps`, the sub-items within a given todo. You will need to:

+ Update the store
  + Create another reducer called `StepsReducer` and add it to your reducer via `combineReducers`
  + Add another selector that will allow components to get the steps as an array
+ Create a new `actions` file to hold `steps` action creators
  + Create new `step` constants
+ Create new API utility functions that will make `$.ajax` requests to your backend's new API endpoints
+ Add a new `StepMiddleware` to your `MasterMiddleware`
  + This middleware will use the API utility functions that you just wrote and pass along the HTTP Responses to your `Store`

## Phase 7: steps components

Create React components to display the steps for a given todo list item, as well as a form that allows users to create new steps. (They will probably live in that item's TodoDetailView.)

Suggested components include:

+ `step_list_container` & `step_list`
+ `step_list_item_container` & `step_list_item`
+ `step_form`

## Bonus

+ style your site so that it looks presentable to VCs
  + potential inspiration: [trello](https://trello.com/), [todoist](https://todoist.com/), [google keep](https://keep.google.com/), [any.do](http://www.any.do/anydo/), [wunderlist](https://www.wunderlist.com/) 
+ add additional features
  + tags for todos
  + steps can have sub-steps (polymorphic associations)
  + allow markdown or text styling in todos ([quill.js](https://quilljs.com/)
  + update todo title & bodies
  + sorting by priority
  + adding a time when something is due
    + sort by due date
    + item pops up when it is due


[object.freeze]: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze'
[middleware_reading]: '../../readings/middleware.md'
[components_reading]: 'https://github.com/appacademy/curriculum/react#w7d1'
[connect_reading]: 'https://github.com/appacademy/curriculum/react#w7d1'