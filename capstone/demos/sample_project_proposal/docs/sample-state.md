```js
{
  currentUser: {
    id: 1,
    username: "sirspamalot",
    session_token: "XXXXXXXXXXX",
    password_digest: "XXXXXXXXXXXX"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []},
    createNote: {errors: ["body can't be blank"]}
  },
  notebooks: {
    1: {
      title: "Redux",
      author_id: 1,
      description: "is cool"
      notes: {
        1: {
          title: "Sample State",
          body: "is useful to plan",
          author_id: 1,
          notebook_id: 1
        }
      }
    }
  },
  suggestions: ["Redux", "Reptiles", "Regurgitate"]
}
```
