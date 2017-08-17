# Full-stack Proposal Preparation: Routes

Now that we know how to delegate some of our app state to our frontend router, we should begin thinking about what routes we need in our full-stack projects. Let's consider frontend routes first, then backend.

Take some time to research the site you are cloning. Review each of the views you will be rendering, keeping these things in mind:
- Frontend
  - What resource(s) is being displayed?
  - Is a specific record is being displayed? Can it be identified by a wildcard in the URL?
  - If search results are being displayed, is the [query string][query-string] in the URL bar?
- Backend
  - What API route should the displayed resource(s) make requests to?
  - What other CRUD is happening on the page? Do we need create/edit/delete routes?

[query-string]: https://en.wikipedia.org/wiki/Query_string

Create a rough-draft of your frontend and backend routes. For the frontend, try to model your app's routes to the one you are cloning. Remember, our frontend routes are being used to dictate what components will be rendered, so make sure to consider your route params. Our backend routes should generally remain RESTful, though there may be views that require multiple resources or  and therefore a custom route.

## Example

Here's yet another example from our _super_ basic Twitter  clone:

---
# Tweeeter Routes

## Frontend

- `/` - home/tweet index
- `/login` - login (obviously)
- `/signup` - signup (obviously)
- `/users` - users index
- `/users/:id` - user detail

## Backend

- `GET /` - serves up our `root.html`
- `POST /session` - login
- `DELETE /session` - logout
- `POST /users` - signup
- `GET /users` - users index
- `GET /users/:id` - user detail
- `POST /tweets` - tweet form
- `GET /tweets` - tweet index
