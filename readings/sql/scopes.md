# Scopes

It's common to write commonly used queries as a **scope**. A scope is
just a fancy name for an `ActiveRecord::Base` class method that
constructs all or part of a query and then returns the resulting
[`Relation` object][relation-reading].

Use scopes to keep your query code DRY: move frequently-used queries
into a scope. It will also make things much more readable by giving a
convenient name of your choosing to the query.

```ruby
class Post < ActiveRecord::Base
  def self.by_popularity
    self
      .select("posts.*, COUNT(*) AS comment_count")
      .joins(:comments)
      .group("posts.id")
      .order("comment_count DESC")
  end
end
```

We can now use `Post.by_popularity`:

```sql
irb(main):001:0> posts = Post.by_popularity
  Post Load (5.7ms)  SELECT posts.*, COUNT(*) AS comment_count FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id" GROUP BY posts.id ORDER BY comment_count DESC
=> #<ActiveRecord::Relation [#<Post id: 12>, #<Post id: 5>, ...]>
irb(main):002:0> posts.first.comment_count
=> 45
```

Because it returns a `Relation` object and not just the results, we can
continue to tack query methods onto it. This makes scopes super flexible.
Suppose we only want the 5 most popular posts:

```sql
irb(main):003:0> posts = Post.by_popularity.limit(5)
  Post Load (1.4ms)  SELECT posts.*, COUNT(*) AS comment_count FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id" GROUP BY posts.id ORDER BY comment_count DESC LIMIT 5
=> #<ActiveRecord::Relation [#<Post id: 12>, #<Post id: 5>, ...]>
irb(main):004:0> posts.count
=> 5
```

Another awesome thing about scopes is that you can use them with
associations. Through a bit of Rails magic, we can call
`user.posts.by_popularity`:

```sql
irb(main):005:0> posts = User.first.posts.by_popularity
  User Load (0.7ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT 1
  Post Load (28.7ms)  SELECT posts.*, COUNT(*) AS comment_count FROM "posts" INNER JOIN "comments" ON "comments"."post_id" = "posts"."id" WHERE "posts"."user_id" = $1 GROUP BY posts.id ORDER BY comment_count DESC  [["user_id", 1]]
=> #<ActiveRecord::AssociationRelation #<Post id: 1>, #<Post id: 7>, ...]>
irb(main):006:0> posts.first.comment_count
=> 8
```

Remember that `User#posts` returns a [`Relation`
object][relation-reading] too. `Relation` objects know what kind of
model objects they should contain. Because of this they will actually
assume the class methods (including scopes) that are available on that
model class. In this case, `User#posts` contains `Post` objects, so we
can chain scopes like `Post::by_popularity` directly on the result of
`User#posts`. Cool!

One final note: You will often see a shorthand syntax for defining
scopes using the `scope` method. Read more about this and other cool
stuff like scope chaining in [the docs][scope-docs].

[relation-reading]: relation.md
[scope-docs]: http://apidock.com/rails/ActiveRecord/NamedScope/ClassMethods/scope
