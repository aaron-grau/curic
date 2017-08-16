# Full-stack Proposal Preparation: State Shape

We've learned how important our state shape (and normalization) is to our keeping our application logic simple as our app scales.
Following what we've done in class, let's work on structuring our redux state.

Again, take some time to research the app you are clone. While referring to your [MVPs][mvps], keep these things in mind:
- What resources will I be fetching from the database?
- What else do I need to keep track of in my app? (current user info, form errors, loading spinners, sorting strategies for lists, etc.)

[mvps]: ../../proposal/mvp-list.md

Create an outline of what your app's store will look like. This should be like a store snapshot, with each slice populated with some dummy data. Remember, we want to separate our concerns to keep it simple, so try to avoid putting every slice at the top-level. It is faily common to create specific top-level reducers to delegate work to nested reducers. Some examples:

* `entities` - contains all resources fetched from database
* `ui` - contains view configuration data, such as: sorting, pagination, loading screens, et.
* `errors` - contains error information for different forms

## Example

Here's another example from our _super_ basic Twitter clone:

---

# Tweeeter Sample State

```js
{
  entities: {
    users: {
      1: {
        id: 1,
        username: 'Guest',
        handle: '@guest'
        tweet_ids: [1, 3],
      },
      7: {
        id: 7,
        username: 'FluffyBear',
        handle: '@floof',
        tweet_ids: [2, 10, 11],
      }
    },
    tweets: {
      1: {
        id : 1,
        body: "oh hai!",
        user_id: 1
      },
      2: {
        id : 2,
        body: "my floooof is amaaazing!",
        user_id: 7
      },
      3: {
        id : 3,
        body: "my guest tweets are dull",
        user_id: 1
      },
      10: {
        id : 10,
        body: "I like snacking on berries!",
        user_id: 7
      },
      11: {
        id : 11,
        body: "mayhaps I will sleep for the winter",
        user_id: 7
      }
    }
  },
  ui: {
    loading: true/false,
  },
  errors: {
    login: ["Incorrect username/password combination"],
    tweetForm: ["Tweet body cannot be blank"],
  },
  session: {
    id: 1,
    username: 'Guest',
    handle: '@guest'
    avatar_url: 'www.imgssss.com/guest.jpg'
  }
}
```
