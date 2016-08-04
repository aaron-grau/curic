# Reddit On Rails

* [Project Demo](http://aa-reddit-on-rails.herokuapp.com/)
* [Actual Reddit](http://www.reddit.com)

## Phase I: Auth

Write a basic Auth implementation
(`User`, `UsersController`, `SessionsController`).

**Do not looks at previous day's solutions.  Write Auth from scratch!**  It is important that you understand how each method works, and how to debug any errors you may encounter.  

## Phase II: `Sub` and `Post`

A `Sub` is a topic-specific subforum to which users submit a
`Post`. Start by writing a `Sub` model and `SubsController`. The
`Sub` should have `title` and `description` attributes and a
`moderator` association. The creator of the `Sub` is the
`moderator`.

Write all the standard seven routes for `SubsController`. You can leave
out `destroy` if you like.

Write an `edit` route where the moderator is allowed to
update the `title` and `description`. Use a `before_action` to
prohibit non-moderators from editing or updating the `Sub`.

The point of a `Sub` is for users to share posts. A `Post` should
consist of:

* A `title` attribute (required)
* A `url` attribute (optional)
* A `content` attribute for content text (optional)
* A `sub` association to the `Sub` the `Post` is submitted to (required)
* An `author` association.

Again, write all the standard `PostsController` actions, excepting
`index` (the `subs#show` can list `posts`).

Write `posts#edit` and `posts#update` controller actions (and routes)
that only the `Post` author can use.

## Phase III: Cross-posting to multiple Subs

Let's allow a `Post` to be posted to multiple subs. This will
involve a `PostSub` join table to describe the many-to-many
relationship. Add appropriate DB constraints and model validations to
`PostSub`. Require that a `Post` has at least one associated sub.
Create appropriate associations between `Post`, `PostSub`, and `Sub`.

Edit your 'Post' new/edit views to allow the user to select multiple subs
via checkboxes
* Structure your HTML form to upload an array of `sub_ids` nested under `post`
* Update the `PostsController#post_params` to accept an array of `sub_ids`

You should now be able to associate a post to the subs that you
select. This works because the `Post#subs` association gives us a
method, `Post#sub_ids=`, which will automatically create/destroy the
necessary entries in the `PostSub` join table. Recall that Rails will
call a setter method for each attribute that you assign in `Post.new`
or `Post#update`, so if one of the keys in our attributes hash is
`sub_ids`, Rails will automatically call `Post#sub_ids=`.

Lastly, make sure your form can be used for editing. Make sure to use
the boolean `checked` HTML attribute.

## Phase IV: `Comment`

Users should be allowed write a `Comment`. There are two kinds of
comments:

* Top-level comments that are in direct response to the `Post`.
* Nested comments that respond to a `Comment`.

Start by focusing on top-level comments. Write a `Comment` model with:

* A `content` attribute,
* An `author` association,
* A `post` association.

Write a `CommentsController` and add a route to `create`
`Comment`. The `new` route could have a url like
`/posts/123/comments/new`. I recommend that your form post to a
top-level `/comments` URL, though. These are the only two comments
routes you need so far.

Edit your `PostsController#show` view to provide a link to a comment
form and to display top-level comments.

### Nested Comments

Let's start allowing nested comments. To do this, add a
self-referencing foreign key `parent_comment_id` to `Comment`.
Top-level comments will have a `NULL` `parent_comment_id`, but nested
comments should store a reference to their parent. **Nested-comments
should still store a `post_id`, even though this may seem redundant**;
later we'll see why. Write a `Comment#child_comments` association.
Write a `Post#comments` association.

On your `PostsController#show` page, for each top level comment, add a
link to the `show` page of the comment (e.g., to `/comments/123`). You
can find top level comments like so:
`@post.comments.where(parent_comment_id: nil)`.

Even though the comment is visible on the `Post` `show` page, add a
link to a `Comment` `show` page at `/comments/123`. This page will
give us a good place to show not only the specific comment, but also a
form to reply to this comment. To repeat, this is how we're going to
support nested replies: the user clicks a link to the comment show
page, which has a form to write the nested reply.

On the `Comment` show page, have a form that, when posted, will create
the **nested** comment. This is in addition to your comment form on
the `Post` `show` page at `/posts/456`, which makes new **top-level**
comments. Both forms should post to `/comments`.

Update your `PostsController#show` to display nested comments too. Use
nested `ul` tags to make the parent-child relationship obvious.

I would build a `_comment` partial to display a `comment` and have the
partial iterate through the `#child_comments`, recursively rendering
the partial for each nested comment.

**This is an N+1 query approach**. We will first query all top level
comments with `Post#top_level_comments`. Then, for each top-level
`Comment`, the partial will call `child_comments` to get the
second-level comments. For each second-level comment, the recursive
partial call will call `child_comments` again to get the third-level
comments...

`Comment#child_comments` gets called once per comment, so this is N+1.

**We'll fix this soon**, but get the N+1 way working first!

## Phase V: Comments Without N+1 Queries

Instead of fetching comments over-and-over again, we can fetch **all**
the comments we'll need at once by writing a plain `Post#comments`
association. This includes both top-level comments, and all the nested
comments.

Fetching all the comments this way creates some difficulty because it
doesn't organize the comments in an easy to access parent-child
relationship. I would have the `PostsController#show` fetch all the
comments for a post and store them in an instance variable
`@all_comments`. In the view, I would iterate through `@all_comments`,
and skip those where `parent_comment_id IS NOT NULL`; I would render
the `_comment` partial for only the top-level comments.

The `_comment` partial renders a comment (let's call it `c1`). It
should display the `c1.content`, `c1.author.username`, and
`c1.created_at`. As before, it needs to display the comments that are
replying to `c1`. Previously, we wrote `c1.comments` to get these
second-level comments. However, that would trigger a second query.

We've already fetched the second-level comments (along with many
others) and stored them in `@all_comments`. So instead of calling
`c1.comments`, do an `@all_comments.each do |c2|` and recursively
render the `_comment` partial **only** when `c2.parent_comment_id ==
c1.id`. Because `@all_comments` contains all the comments for the
`Post` at every level, we won't miss any of `c1#child_comments`.

One quick note: calling `comment#author` repeatedly will also
trigger an N+1 query, so use `includes(:author)` when fetching
`@all_comments`.

## Phase VI: Even Faster Comments

For each comment, to find all child comments, our approach iterates
through the entire `@all_comments` array. This approach is slow:

* Say there are 1000 comments overall
* For each of the 1000 comments `c1`, we'll iterate through all 1000
  comments, checking `c1.id == c2.parent_comment_id` each time.
* This is a total of `1000 * 1000 == 1MM` comparisons.

We say that this is an `O(n**2)` algorithm. The time it takes to
render the comments will grow proportional to the square of the number
of comments. Let's change our approach to an `O(n)` algorithm where
the time to render comments grows linearly in the total number of
comments.

The obvious waste of our approach is that we iterate through
`@all_comments` repeatedly to find child comments. Instead, after
fetching all the comments for a post, let's write a method
`Post#comments_by_parent_id` which returns a **hash** of comments, where
the keys are parent comment ids, and the values are children comments:

```ruby
post.comments
# => [
#   { id: 1, parent_comment_id: nil, content: "top-level-1" },
#   { id: 2, parent_comment_id: nil, content: "top-level-2" },
#   { id: 3, parent_comment_id: 1, content: "nested-1" },
#   { id: 4, parent_comment_id: 3, content: "nested-2" },
#   { id: 5, parent_comment_id: 3, content: "nested-3" }
# ]

@comments_by_parent_id = post.comments_by_parent_id
# => {
#   nil => [
#     { id: 1, parent_comment_id: nil, content: "top-level-1" },
#     { id: 2, parent_comment_id: nil, content: "top-level-2" }
#   ],
#
#   1 => [
#     { id: 3, parent_comment_id: 1, content: "nested-1" }
#   ],
#
#   3 => [
#     { id: 4, parent_comment_id: 3, content: "nested-2" },
#     { id: 5, parent_comment_id: 3, content: "nested-3" }
#   ]
# }
```

If you have a hash like this, it becomes very fast to find child
comments of `c1`: `@comments_by_parent_id[c1.id]`. It turns out that
hash lookup is insensitive to the size of the hash (we say it is
`O(1)`).

Write `Post#comments_by_parent_id`, call it in the controller and set an
instance variable, and use it in your `_comment` partial.

## Bonus Phase I: Votes

A major feature of Reddit is the ability to upvote/downvote posts and
comments. Let's write a `Vote` model which allow us to vote on posts
or comments. Because a `Vote` can be for one of two kinds of things,
we'll want to use a polymorphic association for this.

Write one `Vote` model with a `value` attribute, which should be
either `+1` or `-1`. Add a polymorphic association
`Vote#votable`. Also add `votes` associations to both `Post` and
`Comment`.

On the `SubsController#show` page, add up/downvote buttons for each
posts; add up/downvote buttons for each comment on the
`PostsController#show` page. I added custom member routes for
POST requests to `/posts/123/upvote` and `/comments/123/downvote`.

Finally, sort the posts on the `SubsController#show` page by score;
likewise, sort each level of comments by score.

## Bonus Phase II:

* Use the [Friendly ID][friendly-id] gem to use human readable names
  in urls for posts and subs.
* Use the [kaminari][kaminari] gem to paginate posts on the
  `SubsController#show` page.
* Is there an N+1 query introduced when you sort posts or comments by
  votes? Eliminate it.
* Write a score that includes "hotness" by multiplying the value of
  recent votes.

## Bonus Phase III:

* Users should be able to subscribe to specific `subs` and only see `posts`
from those `subs` on the `index` page.
* Users should be able to search for any `sub`, including ones they aren't
subscribed to.
* The user `show` page should display all of a user's `posts`, `comments`,
and the total number of `votes` they've received from other people for their
`posts` and `comments`.
* Add lots of seeds with [Faker][faker].
* Style your Reddit app! Try to make it look as much like actual Reddit as
you can.

[faker]: https://github.com/stympy/faker
[kaminari]: https://github.com/amatsuda/kaminari
[friendly-id]: https://github.com/norman/friendly_id
