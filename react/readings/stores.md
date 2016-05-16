# Stores

We've learned how to make React components in isolation, but say we want to store other information regarding the state of our app that doesn't fit neatly into one component's state. For example, say we want to fetch some information from our backend that is needed across multiple components. Where should we store this information?

We store it in a store!

Stores contain application state and logic. They are somewhat similar to a model in a typical MVC, but can manage the state of various objects rather than representing a single record of data. In addition to storing data, we can use stores to "register" callbacks. Then, when the state of the store changes, we can trigger the callbacks to affect some sort of change in our UI.

For example, lets say we had a React component that rendered a list of posts. We want to fetch our posts from the backend, then render them.

```javascript
// frontend/components/postIndex.js

  var PostIndex = React.createClass({
    getInitialState: function () {
      return { posts: [] };
    },

    render: function () {
      return(
        <ul>
          {this.state.posts.map(function (post) {
            return <li>{post.title}</li>
          })}
        </ul>
      );
    }
  });

  module.exports = PostIndex;
```

We start our initial state with an empty array of posts, because we haven't fetched anything from the backend yet.

Now let's get our store set up to hold some posts once we fetch them. We'll keep them in a private variable so that the variable can only be edited via the store.

Let's also write some utility functions so we read the contents of the store, or check for a specific post in the store. We should also write functions to add a post to the store, reset all of the posts, or remove a post. Some example code is included below.

```javascript
// private variable where we will store posts
var _posts = [];

PostStore.all = function () {
  // Gives us a copy of all the posts
  return _posts.slice();
};

PostStore.find = function (id) {
  // Allows us to get a single post
  for (var i = 0; i < _posts.length; i++) {
    if (_posts[i].id === id) {
      return _post;
    }
  }
};

PostStore.resetPosts = function (posts) {
  _posts = posts;
};

// ...etc.

module.exports = PostStore;
```

Okay, cool. So we have the ability to add and read posts from our store... how do we actually get posts into the store from the server? Let's write a function to fetch posts from our server in our
store file. (Note: ultimately calls to our server will live elsewhere, but for now, our store is a fine temporary home.) We would also write functions to delete posts, create a post, etc.

```javascript
// frontend/stores/postStore.js

//...etc.

PostStore.fetchPosts = function () {
  $.ajax({
    url: "/posts",
    method: "GET",
    success: function (posts) {
      // Now, when we receive posts from the server, we can add them to the store.
      PostStore.resetPosts(posts);
    }
  });
}

module.exports = PostStore;
```

Great - so at this point we have a function that can fetch all of posts then add them to our store. Where and when do we actually invoke this? The answer is that we should fetch all of the posts (or whatever action we may be invoking) in the react component that needs them (in our case, the PostIndex). We can do this in the `componentDidMount` lifecycle method so that the component can fetch the posts right when it mounts to the page.

```javascript
// frontend/components/postIndex.js
  var PostStore = require('../stores/postStore');

  var PostIndex = React.createClass({
    getInitialState: function () {
      return { posts: [] };
    },

    componentDidMount: function () {
      PostStore.fetchPosts();
    },

    render: function () {
      return(
        <ul>
          {this.state.posts.map(function (post) {
            return <li>{post.title}</li>
          })}
        </ul>
      );
    }
  });

  module.exports = PostIndex;
```

Woohoo! But wait... this gets our posts in the store, but because we fetch posts from the server asynchronously, how does our component know when the posts are arrived so it can grab them? Enter Post Store "listeners".

A store listener is just a callback that is triggered when something changes in our store, like receiving a new batch of posts.

From our PostIndex component, we can set a callback on our PostStore that will:
a) grab all the posts from the store and b) set our state to those posts. We will store the callback in a callback array in our store. Let's see what that would look like in code:

```javascript
// frontend/stores/postStore.js

//...etc.
_posts = [];
_callbacks = [];

PostStore.addListener = function (callback) {
  _callbacks.push(callback);
}

PostStore.executeListeners = function () {
  // Call all the callbacks!!!

  for (var i = 0; i < _callbacks.length; i++) {
    _callbacks[i]();
  }
};

PostStore.fetchPosts = function () {
  $.ajax({
    url: "/posts",
    method: "GET",
    success: function (posts) {
      PostStore.resetPosts(posts);
      // Now, once all of our posts are in the store, we execute all the callbacks!
      PostStore.executeListeners();
    }
  });
}

```

And, in our component:

```javascript
// frontend/components/postIndex.js
  var PostStore = require('../stores/postStore');

  var PostIndex = React.createClass({
    getInitialState: function () {
      return { posts: [] };
    },

    componentDidMount: function () {
      PostStore.fetchPosts();

      // We call our new addListener function to add a callback
      PostStore.addListener(this._onChange.bind(this));
    },

    _onChange: function () {
      // This is triggered when we get the posts from our server and put them in our post store
      this.setState({posts: PostStore.all()});
    },

    render: function () {
      return(
        <ul>
          {this.state.posts.map(function (post) {
            return <li>{post.title}</li>
          })}
        </ul>
      );
    }
  });

  module.exports = PostIndex;
```

Sweet! Let's go through what happens when our component mounts from start to finish.

1) We set the initial state PostIndex's posts to an empty array.
2) When the component mounts, we add a listener to our PostStore's callbacks array, then fetch all the posts from the server.
3) Eventually, we get our posts back from the server and the success callback to fetchPosts is triggered. This adds the posts to `_posts` and calls `PostStore.executeListeners` which will run our `PostIndex._onChange` function.
4) `PostIndex._onChange` will set all of our posts to the posts in the store.

Voila! Stores.

## Stores: what else are they for?

In this example, we used stores to keep a collection of objects from the database, but we can use stores for other things as well!

We can use stores to keep anything that doesn't neatly fit into one component's state. For example, if we were writing an Yelp clone that fetched restaurants based on specific params, and these params were needed across multiple React Components, we might keep a ParamsStore. The possibilities to store things are endless!
