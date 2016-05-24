# w3d4: JoinsDemo

This app introduces you to all the major concepts of associations,
validations, includes, and joins using Active Record and Rails.

Instructions:
- First check out `db/schema.rb` to see how each of the models relate to one another.
  - `User`s make `Post`s, and leave `Comment`s on existing `Post`s - make sure you understand how this is represented through the tables and their foreign/primary key relationships.
- Read through the notes within `app/models/comment.rb` on how associations are used to
  generate SQL queries.
- Read through the example and explanation  of a `has_many
  :through` relation within `app/models/user.rb`.
- Also within `User`, go through each type of query and make sure to understand how they differ from and improve upon each other:
  - making a query using N+1 `SELECT`s
  - using `includes` to avoid the N+1 problem
  - using `joins` to avoid fetching all the extra data that `includes` brings down.

**MAKE SURE TO UNDERSTAND THIS DEMO IN FULL**
