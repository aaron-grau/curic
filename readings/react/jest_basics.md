# Jest Basics

Jest is the testing framework that Facebook uses to unit test React. We'll be using it for Assessment 06. Here are the basics you need to know for testing with Jest.

## Jest uses Jasmine 2 Matchers

Think back to assessment 5 - it looks a little like this:

```javascript
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
```

Check the [jasmine documentation][jasmine] to see all of the matchers.

[jasmine]: http://jasmine.github.io/2.0/introduction.html

## Jest Auto-Mocks Everything for Simple Unit Testing

When we unit test our components, we don't want to have to rely on whether other components work. We want to be able to test our component in isolation. Jest makes things easy by auto-mocking every module, unless you explicitly tell it not to.

First off, what is a mock? A mock erases the actual implementation of a function and it allows us to capture its calls. When we require a module, jest goes through and wraps every function it finds with a mock.

Take the follow code as an example:

```javascript
// sum.js

var sum = function (a, b) {
  return a + b;
}

module.exports = sum;
```

When we require sum in a jest test, it returns a mocked version of sum. If called, the mock will return undefined. We can see an array of all the arguments given to its calls using `sum.mock.calls`. See the following example:

```javascript

describe('sum', function () {
  it('is called with the correct arguments', function () {
    var sum = require('../sum');
    // We make 2 calls to sum
    sum(1, 2);
    sum(3, 4);

    // Let's see what arguments the mock was called with. mockFn.mock.calls returns an array of calls that looks something like this: [[1,2], [3,4]]

    var sumMock = sum.mock.calls;
    var firstCall = sum.mock.calls[0];
    var secondCall = sum.mock.calls[1];

    expect(firstCall).toEqual([1,2]);
    expect(secondCall).toEqual([3,4]);

    // If we want to see what the first argument to the first call is, we would do something like this:

    var firstArg = firstCall[0];

    expect(firstArg).toEqual(1);
  });
});

```

If we want to test how sum actually works, we need to explicitly unmock it.

```javascript
jest.unmock('../sum'); // unmock to use the actual implementation of sum

describe('sum', function () {
  it('adds 1 + 2 to equal 3', function () {
    var sum = require('../sum');
    expect(sum(1, 2)).toBe(3);
  });
});

```

Nice! Jest automocking in a nutshell.

Make sure to read through this resource: [jest getting started][jest]

[jest]: https://facebook.github.io/jest/docs/getting-started.html#content

Let's go into a more complex example involving React. Say we're writing a React app that lists posts. We have a PostIndex component which listens to a store and renders back the posts titles.

``` javascript
var React = require('react');
var PostStore = require('../stores/postStore');
var ClientActions = require('../actions/ClientActions');

module.exports = React.createClass({
  getInitialState: function () {
    return {posts: []};
  },

  componentWillMount: function () {
    ClientActions.fetchPosts();
    PostStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({posts: PostStore.all()});
  },

  render: function () {
    return (
      <div>
        {
          this.state.posts.map(function (post) {
            return <p>{post.title}<p/>;
          })
        }
      </div>
    );
  }
});

```

We want to test to make sure that we fetched posts from our client actions and added a listener to the store. How would we do this? Let's take a look.

```javascript

jest.unmock('../postIndex.jsx'); // We unmock postIndex because we want to test it

describe('PostIndex', function () {
  before('each', function () {
    var PostIndex = require('../postIndex.jsx');
    var PostStore = require('../../stores/postStore.js'); // This is a mock
  });

  it('adds a listener to the PostStore', function () {
    // Now we can check to make sure that we added a listener to the PostStore
    var postStoreListenerCalls = PostStore.addListener.mock.calls;
    expect(postStoreListenerCalls.length).toBe(1);
  });

  it('calls PostStore.all when the listener is triggered', function () {
    // Okay, now things are about to get crazy.
    var postStoreListenerCalls = PostStore.addListener.mock.calls;

    // Let's grab the first arg of the first call to our post store. This is the
    // function PostIndex._onChange, which should call PostStore.all when called.
    var listenerFunction = postStoreListenerCalls[0][0];

    // We can simulate invoking it, and make sure that PostStore.all is triggered
    listenerFunction();
    var postStoreAllCalls = PostStore.all.mock.calls;

    // Sweet, now finally we can check if PostStore.all was called!
    expect(postStoreAllCalls.length).toBe(1);
  });
});

```

Whew! And that's jest the basics. Check out the full API Documentation to learn more.

https://facebook.github.io/jest/docs/api.html#content
