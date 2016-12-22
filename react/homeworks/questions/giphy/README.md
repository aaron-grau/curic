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

## Phase 2: Rendering Giphys
