# Redux Structure

The application's state is organized by data type. Under each data type, there
may be sub-states. Each action is listed with the sequence of events that
results from its invocation, ending with the API or a reducer.

Using this document, you should be able to trace an **action** starting with
where it was invoked, through the **API**/**reducer** involved, and finally to
the **components** that update as a result. Once you start implementing your
Redux structure, you'll need to do the same.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `AuthForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `AuthForm` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Sidebar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `requestCurrentUser`
  0. invoked `onEnter` of `/Home`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` stores `currentUser` in the application's state.
* `removeCurrentUser`
  0. invoked from an API callback
  0. the `SessionReducer` removes `currentUser` from the application's state.

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. the `ErrorReducer` stores the `form` in the application's state; `errors` are mapped to their respective forms
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. the `ErrorReducer` removes `errors` for a given `form` in the application's state.

## Note Cycles

### Notes API Request Actions

* `requestAllNotes`
  0. invoked from invoked `onEnter` of `/Home/Note/:noteId` if necessary
  0. `GET /api/notes` is called.
  0. `receiveAllNotes` is set as the success callback.

* `createNote`
  0. invoked from new note button `onClick`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the success callback.

* `requestSingleNote`
  0. invoked from `onEnter` of `/Home/Note/:noteId` if necessary
  0. `GET /api/notes/:id` is called.
  0. `receiveSingleNote` is set as the success callback.

* `updateNote`
  0. invoked from `NewNote` on `AutoSave`
  0. `PATCH /api/notes/:id` is called.
  0. `receiveSingleNote` is set as the success callback.

* `destroyNote`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/notes/:id` is called.
  0. `removeNote` is set as the success callback.

### Notes API Response Actions

* `receiveAllNotes`
  0. invoked from an API callback
  0. the `NoteReducer` updates `notes` in the application's state.

* `receiveSingleNote`
  0. invoked from an API callback
  0. the `NoteReducer` updates `notes[id]` in the application's state.

* `removeNote`
  0. invoked from an API callback
  0. the `NoteReducer` removes `notes[id]` from the application's state.

## Notebook Cycles

### Notebooks API Request Actions

* `requestAllNotebooks`
  0. invoked from `NotebookSearch` input `onChange`
  0. `GET /api/notebooks` is called.
  0. `receiveAllNotebooks` is set as the success callback.

* `createNotebook`
  0. invoked from new notebook button `onClick`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `requestSingleNotebook`
  0. invoked from `onEnter` of `/home/notebook/:notebookId/note/:noteId` if necessary
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleNotebook` is set as the success callback.

* `destroyNotebook`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeNotebook` is set as the success callback.

### Notebooks API Response Actions

* `receiveAllNotebooks`
  0. invoked from an API callback.
  0. The `Notebook` reducer updates `notebooks` in the application's state.

* `receiveSingleNotebook`
  0. invoked from an API callback.
  0. The `Notebook` reducer updates `notebooks[id]` in the application's state.

* `removeNotebook`
  0. invoked from an API callback.
  0. The `Notebook` reducer removes `notebooks[id]` from the application's state.

## Tag Cycles

### Tag API Request Actions

* `requestAllTags`
  0. invoked from `TagSearch` input `onChange`
  0. `GET /api/tags` is called.
  0. `receiveAllTags` is set as the success callback.

* `createTag`
  0. invoked from new Tag button `onClick`
  0. `POST /api/tags` is called.
  0. `receiveSingleTag` is set as the callback.

* `requestSingleTag`
  0. invoked from `onEnter` of `/home/tag/:tagId/note/:notedId` if necessary
  0. `GET /api/tags/:id` is called.
  0. `receiveSingleTag` is set as the success callback.

* `destroyTagging`
  0. invoked from delete Tag button `onClick`
  0. `DELETE /api/taggings/:tagId` is called.
  0. `removeTag` is set as the success callback.

### Tags API Response Actions

* `receiveAllTags`
  0. invoked from an API callback.
  0. The `Tag` reducer updates `Tags` in the application's state.

* `receiveSingleTag`
  0. invoked from an API callback.
  0. The `Tag` reducer updates `Tags[id]` in the application's state.

* `removeTag`
  0. invoked from an API callback.
  0. The `Tag` reducer removes `Tags[id]` from the application's state.
