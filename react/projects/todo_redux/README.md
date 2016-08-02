# ReduxTodos

## Phase 0: rails backend
+ create a new rails project using `--database=postgresql` and `--skip-turbolinks`
+ update your gemfile with `better_errors`, `binding_of_caller`, `pry-rails`, and `annotate`
+ create a `Todo` model with `title`, `body`, and a boolean `done`
+ create a `TodosController` to handle API requests
  + nest under `api/` and call it `Api::TodosController`
  + it will need `index`, `create`, `update`, and `destroy` actions
  + don't forget that it will be serving JSON

## Phase 1: frontend structure

## Phase 2: todos redux structure

## Phase 3: todos components

## Phase 4: steps redux structure

## Phase 5: steps components

## Bonus

+ style your site so that it looks presentable to VCs
  + potential inspiration: [trello]: https://trello.com/, [todoist]: https://todoist.com/, [google keep]: https://keep.google.com/, [any.do]: http://www.any.do/anydo/, [wunderlist]: https://www.wunderlist.com/
+ add additional features
  + tags for todos
  + steps can have sub-steps (polymorphic associations)
  + allow markdown or text styling in todos ([quill.js]: https://quilljs.com/)