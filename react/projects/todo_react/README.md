# Todo React Application

Today we are going to write a Todo application in React. We'll also be
setting up a simple Rails application to serve as our back-end. Start by
creating a new Rails app and navigate into the directory. We'll begin by
getting NPM set up for our project, and then flesh out our `todo` API
before we get to writing React.

NB: Be sure to name your Rails App `TodoApp`.  When you run `rails new todo`,
Rails creates a module `Todo`.  If you were to then create a model named `todo`,
you'd be redefining the Rails app module with the class `Todo`.

### Phase 0: Setup

#### Turbolinks

We'll add an extra option this time when we init our Rails project: `--skip-
turbolinks`.

[Turbolinks][rails-turbolinks] is a gem included by default in Rails 4 that replaces
synchronous links with asynchronously-loading ones. This speeds up the
responsiveness of traditional, synchronous apps. But for a single-page
app, it offers no performance improvement and is the source of
mysterious bugs. Save yourself the trouble and generate your project
without it.

```
rails new TodoReact --skip-turbolinks
```

#### NPM Setup
* Follow the [npm readings][react-rails] to get React and JSX set up in your project.
* Also npm install `bootstrap` so we can use cool html class names like `form-control`,
  `btn btn-success` and `btn btn-danger` to make our app look nice.  Check out
  more about Bootstrap [here][bootstrap].
* Your `package.json` file should look like this:
```
#package.json
{
  "name": "TodoReact",
  "version": "1.0.0",
  "description": "remember what to do!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-core": "^6.1.21",
    "babel-loader": "^6.1.0",
    "babel-preset-react": "^6.1.18",
    "babel-preset-es2015": "^6.9.0",
    "bootstrap": "^3.3.5",
    "react": "^0.14.2",
    "react-dom": "^0.14.2",
    "webpack": "^1.12.6"
  }
};
```
* Create a new folder `frontend` inside your TodoApp's main directory and create the file `todo_react.jsx` there.  This folder will hold all of our components and stores.
* In `webpack.config.js`, have the `entry:` point to our `todo_react.jsx` file and the `output:` point to `./app/assets/javascripts/bundle.js`.  The `webpack.config.js` file should look similar to this:
```
#webpack.config.js

var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/todo_react.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ["es2015","react"]
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};

```
* Run `webpack --watch` in a separate terminal.  `--watch` mode recompiles when there are any changes to your dependencies, creating an updated `bundle.js` file.
* Running webpack should create a `bundle.js` file in your `./app/assets/javascripts/` directory.  Require `bundle.js` in your `application.js` file along with `jquery` and `jquery_ujs`.

### Phase 0.5: Rails Back End

#### Todo model

* Create a `Todo` model.
* Give the model `title` and  `body` attributes.
* Add a boolean column `done` that indicates if the todo is completed.
* Add any necessary validations. (Don't forget about `:presence` vs.
  `:inclusion` for booleans.)

#### Api::TodosController

Create a Rails JSON API with the following routes. You will need to nest
the `:todos` `resources` inside the `:api` `namespace`.

```ruby
GET api/todos/ #index
GET api/todos/:id #show
POST api/todos/ #create
DELETE api/todos/:id #destroy
PATCH api/todos/:id #update
```

Now fill out your `Api::TodosController`. Since you only have to render JSON,
this should be pretty quick to implement. Test out each endpoint to make sure it
works (you might have to make some routes). For requests that involve
posting or patching `todo` data (`create`, `update`), use `$.ajax`
method in the console to test.

**NB**: You might have to nest your API controllers under an `api` folder.  For example, `app/controllers/api/todos_controller.rb`.

#### StaticPagesController

Next make a `StaticPagesController`. Give it a `root` action. Set your
app's `root to:` the root action. You can leave it as a blank page for
now. The important thing is that you have a place to open a console and
test your JavaScript for the next phase.

If you run into issues with StaticPagesController, check out [this stackoverflow][rails-controllers-multiple-names].

[rails-controllers-multiple-names]: http://stackoverflow.com/questions/19607305/routing-for-controllers-with-multiple-words-in-in-rails-4


### Phase 1: Modeling Todos on Front End

We're going to create a global singleton object that will control our
todos state and abstract away API interaction. We'll call it
`TodoStore`.

**Note:** We will **_not_** be using React in this phase.

* Make a new JavaScript file, `frontend/stores/todo_store.js`,
  this will be home to all the code that interacts with our Rails API
  `:todos` resource.
* Declare a new object literal `TodoStore`. Be sure to export `TodoStore`
  using `module.exports`.

#### Todos state

* Declare a `_todos` object to hold `todo.id`s as keys pointing to todo
  JavaScript objects once we get them from the server.
* Declare another variable `_callbacks` for any callbacks that want to
  be notified when the state changes. This is to integrate with our
  React components to ensure that they render on cue. We will call all
  of the functions in `_callbacks` every time our _collection_ changes.

#### Todos methods

Define these methods as properties directly inside the `TodoStore` object.
Remember that `TodoStore` is not a constructor, so there's no prototype
to worry about, and no need to mess with `this`.

##### Event Handling

We need an event system for our `TodoStore` so that React components can
be notified and re-render when the todos collection changes. These
events should be triggered any time we interact with the Todos API.

* `changed()`: This should be called whenever the collection changes. It
  in turn calls every callback registered in `_callbacks`.
* `addChangedHandler()`/`removeChangedHandler()`:  add to and remove
  from `_callbacks`, respectively. These are the methods our React
  components will use to hook into collection events.

##### CRUD

* `all()`: This is just an `attr_reader`-style function that returns the
  current contents of `_todos`. Write this first so it's easier to test
  the API methods that follow.
* `fetch()`: This should make a get request to `/api/todos`. Upon
  success, set `_todos` to the objects returned from the server
  and call `TodoStore.changed()`.
* `create(todo)`: This should take an object as an argument and make a
  `POST` request to persist it to the database. Upon success add the
  server response (which should contain an `id`) to the `_todos` object.
  Don't forget to call `TodoStore.changed()`.
* `destroy(id)`: Deletes the specified todo from the database. Only make
  the ajax request if the `todo` exists to begin with. Upon success be
  sure to remove the object (by `todo.id` lookup) out of `_todos` before
  calling `TodoStore.changed()`.
* `toggleDone(id)`: This should make a `PATCH` request and change the
  specified `todo`'s `done` to the opposite of whatever it is. Then, of
  course, call `TodoStore.changed()`.

Before moving on, we want to test out all of this functionality in our
web browser's console. This can be challenging with webpack, because
we intentionally aren't adding anything to the global namespace, such that
we could access it from the console.

To get around this, we're going to temporarily add it for testing purposes.
In your `todo_react.jsx` file, `require('./stores/todo_store.js')` into a
global object (i,e., don't use `var`). Now when we load up our root page,
we should be abe to access TodoStore from the console. Test everything! After
you're done, remember to remove TodoStore from the global namespace.  

If you're not sure you're going in the right direction, this
would be a good time to have a TA check your work. Once you're
satisfied, move on to the next phase!

### Phase 2: Displaying Todos with React.js

Start by creating a `todo_list.jsx` file in `frontend/components/`. The `.jsx`
extension tells Webpack to compile the JSX into pure JavaScript when bundling.
Require `react` and `todo_store.js`.

#### TodoList

Our first goal is to simply display the titles for our todos.  Read

* Make a `TodoList` react component.
* Set its initial state to `TodoStore.all()`.
* `TodoList`'s `render` method should return a `<div>` with a nested `<ul>`.
  Populate the `ul` with an array of `<li>`s that have the title
  from each of the todos.
  - If you decide to test your code here and are having issues, check the last part of this section and make sure you're using `todosChanged`.
* Within `todo_react.jsx`, require `todo_list.jsx`, `react`, and `react-dom`.
  * NB: `todo_react.jsx` no longer needs to require `todo_store.js` because our
  `todo_list.jsx` file requires the store for us.
* `ReactDOM.render` a `TodoList` to the `div#root` el in to your `root.html.erb`.
  - If you're getting an `Uncaught Error: Invariant Violation:`, you're probably
    trying to put your React element into something that isn't there. How can
    you solve this problem?

Okay, we're rendering, but all we're getting is a `<div>` with an empty `ul`.
We still don't have any todos displayed because we haven't fetched them
yet. Let's write some logic to handle that.

* Write a `todosChanged` method that sets the component's `state` to
  `TodoStore.all()`. This method will be the callback passed to
  `TodoStore.addChangedHandler`.
* In the `componentDidMount` life cycle method, register
  `this.todosChanged` as a callback with `TodoStore` and then call
  `TodoStore.fetch()`.
* Don't forget to define a `componentWillUnmount` method to remove the
  listener.

The component `state` will now change whenever the todos collection
changes, causing a re-render. Move on when you can see your Todos.

##### A Note About Binding

Since we reference `this` in `TodoList.todosChanged`, you may have tried to use
`.bind(this)` when passing it as a callback to the Store's `addChangedHandler`.
This makes sense! But if you did, you'll notice that React gives you a stern
warning.

What's going on? React will automatically bind any component functions passed as
callbacks to that component, meaning we don't need to do it manually. If you're
interested, Facebook provides a bit more information on it [here][fb-bind-link].

#### TodoListItem

Back to our React project. Let's create a subcomponent for our individual todo
items. That way we can easily handle the more complicated multi-field display
logic.

* Make a `TodoListItem` React component.
* It should receive a single todo item as a property.
* The `render` method should render a `<div>` at the root that
  contains child `<div>`s for the title and body.
* Change the render method of `TodoList` to create `TodoListItem`s
  instead of `<li>`s. You can also now remove the `<ul>` and just keep
  the outer `<div>`.

### Phase 3: Making New Todos
* Create another component: `TodoForm`. This should `render` a form with
  a field for `title` and `body`.
* Make this a [controlled component][react-forms]. The initial state
  should be `{title: "", body: "", done: false}`. Create `updateTitle` and `updateBody`
  methods. `onChange` for the `title` or `body` fields, update the `state`.
* `onSubmit` of the form, you should use the `TodoStore`'s `create`
  function from phase 1. Write a `handleSubmit` function to create the
  todo and reset the component's `state`. Don't forget to clear the
  form's state.
* Update the `TodoList` render method to include a `TodoForm`. Check that the
  form is working.

### Phase 4: Deleting Todos
* Add a delete button to the `TodoListItem` component.
* Write a `handleDestroy` function that destroys the todo item by
  calling `TodoStore.destroy()`.
* `onClick` of the delete button, it should call the `handleDestroy`
  function. This will automatically trigger a render thanks to the
  `TodoStore.change()` logic you implemented already.
* Test that the delete button works before moving on.

### Phase 5: Marking Done
* Make yet another React component. Call this one `DoneButton`.
* `render` should return a `button` that has the text `"Done"` when the
  todo is not yet complete and `"Undo"` when the todo is complete.
* Write a `handleDone` function that calls `TodoStore.toggleDone()`.
* `onClick` of this button, have the component call `handleDone`.
* Add a `DoneButton` to the `TodoListItem` view.

### Phase 6: Collapsible Todos
* Let's create one more React component, `TodoDetailView`. This component
  will contain the `body` as well as the delete button for the todo.
* Make this new component a child of `TodoListItem`.
* Initially, the detail view is not shown, so only the title and done
  button are visible. When the todo is clicked, the detail view is
  displayed. Implement this functionality using `this.state` and
  `render`.

### Phase 7: Todo Steps

Todos should now have steps!

#### UI

* Steps will be listed inside `TodoDetailView` and each step should
  have a `Done` button, just like the `TodoListItem`.
* Once the `TodoDetailView` is rendered, fetch the steps for that todo.
* You should also have a form to create new steps and buttons to delete
  the existing ones.

#### Rails

* Add the appropriate model, associations, and controller to Rails.
* You'll need `index`, `create`, `update`, and `destroy` endpoints.
* Nest `index` and `create` inside of your `:todos` resource.

#### StepStore

* Create a `StepStore` alongside your existing `TodoStore`, following
  the same pattern.
* Your `StepStore`'s `.fetch` and `.all` methods will need to take a
  `todoId` argument.
* Since you're not fetching all the steps at once, you shouldn't store
  all the steps in one object. Have them in separate objects keyed on
  `todoId`.

### Bonus time!

* Create a `SidebarView` that lists all the todos and the form.
  Clicking on a `todo` title displays the `title`, `body` and `delete`
  button in a `MainView`.
* Add a `topic` attribute to your todos. This will be a string that
  organizes todos based on topic (school, work, personal, etc.). Create
  separate React components for each topic. The `TopicView`s will live
  in the sidebar, displaying their respective `todo` titles.

[rails-turbolinks]: http://guides.rubyonrails.org/working_with_javascript_in_rails.html#turbolinks
[react-rails]: ../../readings/npm_reading.md
[react-forms]: http://facebook.github.io/react/docs/forms.html#controlled-components
[bootstrap]: http://v4-alpha.getbootstrap.com/components/buttons/
[fb-bind-link]: https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#under-the-hood-autobinding-and-event-delegation
