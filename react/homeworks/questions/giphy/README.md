# Giphy Search

The goal for today's project is to become more comfortable with the full
Redux cycle. To do this, you'll be building out a single Redux cycle for a
Giphy search tool. Ultimately, we want to have a search bar that hits
the Giphy API and renders an index of the results below. Here's a
screenshot of how the final product should look:

![screenshot](./giphy_screenshot.png)

## Setup

To get started, download the [skeleton] and familiarize yourself with the
file structure. We have all of the conventional folders for front-end
files: actions, components, reducers, store, and util. We also have a CSS
folder that has a simple stylesheet made for you.

[skeleton]: ./skeleton.zip?raw=true

## Component Overview

Now that you're acquainted with the file structure laid out, let's map out
an overview of the components hierarchy:

```
Root
  GiphysSearchContainer
    GiphysSearch
      GiphysIndex
```

- `Root`: As usual, it is responsible for connecting our component tree
  with the `store`. It renders the `GiphysSearchContainer`.
- `GiphysSearchContainer`: Container for our `GiphysSearch` component.
- `GiphysSearch`: renders the search bar and handles all of the search
  logic (keeping track of the query and trigger the AJAX request on submit);
  renders the `GiphysIndex`.
- `GiphysIndex`: iterates over the `giphys` in `props`, rendering each one.

## Phase 1: Searching Giphy

### API Util

Let's start off by constructing our API Util file to make the right AJAX call
to the Giphy API. We just need one function, `fetchSearchGiphys`. It will
take a single argument, the `searchTerm` that our using is currently searching.
You can check out the [Giphy API docs][giphy-docs] for more details, but in short, we want to
make a `GET` request to `http://api.giphy.com/v1/gifs/search?q=${search+term}&api_key=dc6zaTOxFJmzC&limit=2`
where the `${search-term}` is replaced with our actual query. We tag `limit=2`
onto the end of our query params to tell Giphy we only want two GIFs back.
The giphy API is relatively slow, so keeping the response size down helps our
app be a little faster.

Remember, it's best to test small pieces as we go. Let's test out that AJAX
request to make sure it's doing what we're intending.

First, `webpack --w` to make sure our `bundle.js` file is getting updated. It
has already been sourced for you in `index.html`.

Open the `index.html` file in the browser. The jQuery `script` tag has already
been added, so `$.ajax` should already be defined. Go ahead and put `fetchSearchGiphys`
on the window so we have access to it in the console.

Try running this test code:

```js
fetchSearchGiphys("puppies").then((res) => console.log(res.data));
```

This is making the AJAX request, which will return a promise. We then chain on
a `then` to tell it to log the response data once it comes back. We should
see an array of two objects. Those are our giphys! Make sure you get this
working before moving on, and don't forget to remove `fetchSearchGiphys` from
the window once you're done testing.

[giphy-docs]: https://github.com/Giphy/GiphyAPI

### Actions

Next, let's get our actions set up to properly request and receive giphys.
As always, we want to export constants for all of our action types that
simply point at strings of the same content:

```js
export const RECEIVE_SEARCH_GIPHYS = 'RECEIVE_SEARCH_GIPHYS';
export const REQUEST_SEARCH_GIPHYS = 'REQUEST_SEARCH_GIPHYS';
```

Now for the actual actions. We will need the function we just wrote
in `api_util.js`, so go ahead and import that:

```js
import * as APIUtil from '../util/api_util';
```

Let's write our request action. 

## Phase 2: Rendering Giphys
