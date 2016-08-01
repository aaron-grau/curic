# Heredocs

We know how to format SQL code in a `.sql` file, but what if we mix SQL into our Ruby code? The answer is to use a **heredoc** to write multi-line strings with ease:

```ruby
query = <<-SQL
SELECT
  *
FROM
  posts
JOIN
  comments ON comments.post_id = posts.id
SQL

db.execute(query)
```

This replaces `<<-SQL` with the text on the next line, up to the closing `SQL`. We could use any string for the start and end of a heredoc; `SQL` is just the convention when we are embedding SQL code.

A heredoc produces a string just like quotes does, and it will return into the place where the opening statement is. You can think of the above code as looking like this:

```ruby
query = "SELECT * FROM posts JOIN comments ON comments.post_id = posts.id"

db.execute(query)
```

This works as well:

```ruby
db.execute(<<-SQL, post_id)
SELECT
  *
FROM
  posts
JOIN
  comments ON comments.post_id = posts.id
WHERE
  posts.id = ?
SQL
```

Notice the use of the `?` interpolation mark; the Ruby variable `post_id` will be inserted into the query at the `?`. Remember that this sanitizes the variable to help prevent SQL injection attacks.

Passing the input in as a hash will also sanitize it:

```ruby
db.execute(<<-SQL, post_id: post_id)
SELECT
  *
FROM
  posts
JOIN
  comments ON comments.post_id = posts.id
WHERE
  posts.id = :post_id
SQL
```

And while you can interpolate directly into the heredoc (it is just a string, after all), it leaves your code vulnerable to SQL injection. Don't do it.

## References

* [More on heredocs][heredocs]

[heredocs]: https://makandracards.com/makandra/1675-using-heredoc-for-prettier-ruby-code
