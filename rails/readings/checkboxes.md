# Checkboxes and ID setters Reference

We use checkboxes when we want to mark multiple options on a form.

In this tutorial, we will discuss a hypothetical app with `Post` and `Tag`
models. When users create a `Post` via the new post form, we want them to be
able to tag their posts with existing tags. We can accomplish this with a
checkbox input field on our post form where users can check all of the tags that
they want a post to be associated with.

We will look at:
* The Rails associations involved.
* Rails ID setters.
* What to add to your controller.
* How to structure your form.

## Associations

First, let's look at the associations involved in our example app.

`Posts and Tags have a many to many relationship through Tagging. `taggings` is
simply the join table between `Post` and `Tag`. We would write our associations
as such:

```ruby
class Post < ActiveRecord::Base
  has_many :taggings, dependent: :destroy, inverse_of: :post
  has_many :tags, through: :taggings
end

class Tagging < ActiveRecord::Base
  # Validate post and tag rather than post_id or tag_id
  validates :post, :tag, presence: true
  validates :tag_id, uniqueness: { scope: :post_id }

  belongs_to :post
  belongs_to :tag
end

class Tag < ActiveRecord::Base
  has_many :taggings, dependent: :destroy, inverse_of: :tag
  has_many :posts, through: :taggings
end
```

Notice that **we validate the presence of `post` and `tag` rather than `post_id`
and `tag_id`**. Why? Ultimately, we want to be able to create a `Tagging` at the
same time we create a new `Post`. Since our post won't be saved to the database
yet, it won't have an `id` and validating `post_id` would fail. We validate the
existence of a `post` instead.

In addition, notice that **in our associations for taggings, we use `dependent:
:destroy` and `inverse_of`**. The `dependent: :destroy` assures that we destroy
taggings when we destroy their associated `Post`. The `inverse_of` allows us to
find the associated `Tag` or `Post` for a tagging in memory, even if it has not yet
been saved to the database. (Otherwise, it would search in the database for a
post where `tagging.post_id == post.id`, and we don't have an id assigned yet!)

## Tagging Posts with `Post#tag_ids=`

Say we had a `Post` and wanted to tag it with several `Tags`. We would need to create a `Tagging` for each unique `Post`/`Tag` combo.

When we define our `has_many :taggings` and `has_many :tags, through :taggings`
on `Post`, Rails provides us with a `Post#tag_ids=` method that takes in an
array of `tag_id`s.

This method does a lot more than meets the eye. It:
  * a.  Creates a new `Tagging` for the post for each new `tag_id`.
  * b.  Destroys existing taggings for that post that are not in the `tag_id`s 
        array.

We would call it as such:

```ruby
post = Post.first
post.tag_ids = [1,2,3,4]
```

This creates new `Tagging` objects linking the pos to tags with IDs 1, 2, 3, and
4 and deletes any `Tagging`s for `Post`s whose ids are not in the array.

We could also pass in an array of tag ids when we create a new post like such:

```ruby
Post.create(text: "new post", tag_ids: [1,2,3,4])
```

This will simultaneously create a new post along with its associated taggings in
a transaction: If any record fails to save to the database, the entire
transaction will be rolled back.

## Controller

Now that we have our model set up, let's see how we'd a handle a `POST #create` request to the `PostsController`.

```ruby
class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to post_url(@post)
    else
      render :new
    end
  end

  # ...

  private

  def post_params
    params.require(:post).permit(:text, tag_ids: [])
  end
end
```

Looks familiar, with one key difference. In our post params, we include
`tag_ids` as a permitted param, since we'll be passing an array of `tag_ids`
from our form. We also must specify that `tag_ids` permits an array - otherwise,
Rails will assume that we should only permit in simple params like strings.

## View

Now for the actual checkboxes! In our new posts form, we will iterate through
each of the tags and create a checkbox input field with the tag's id as a value.

Our new posts form might look a little like this:

```html
<h1>New Post</h1>

<form action="<%= posts_url %>" method="POST">
  <%= auth_token_helper %>

  <label>Text
    <input type="text" value="<%= @post.text %>" name="post[text]">
  </label>

  <label>Tags</label>

  <input type="hidden" name="post[tag_ids][]" value="">

  <% Tag.all.each do |tag| %>
    <label><%= tag.name %>
      <input type="checkbox"
              value="<%= tag.id %>"
              name="post[tag_ids][]"
              <%= "checked" if @post.tag_ids.include?(tag.id) %>>
    </label>
  <% end %>

  <input type="submit" value="Create Post!">
</form>
```

Again, pretty familiar. The only thing to note is that the name of our checkbox
inputs is `post[tag_ids][]`. This tells our form that when we submit, all the
boxes we've checked will end up in the `tag_ids` array in our params.

In addition, note the hidden input with an empty string for `post[tag_ids][]`.
This just make sure that, even if we uncheck every box, a param is sent through
for `post[tag_ids]`. You can think of it as a harmless placeholder.
