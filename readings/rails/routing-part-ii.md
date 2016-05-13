# Routing II: Nested Collections

## Nested Resource Routes

It's common to have resources that are "children" of other
resources. For example, suppose your application includes these
models:

```ruby
# app/models/magazine.rb
class Magazine < ActiveRecord::Base
  has_many :articles
end

# app/models/article.rb
class Article < ActiveRecord::Base
  belongs_to :magazine
end
```

Nested routes allow you to capture this relationship in your
routing. In this case, you could include this route declaration:

```ruby
# config/routes.rb
NewspapersApp::Application.routes.draw do
  resources :magazines do
    # provides a route to get all the articles for a given magazine.
    resources :articles, only: :index
  end

  # provides all seven typical routes
  resources :articles
end
```

This generates a `/magazines/:magazine_id/articles` route. Requests
for this route will be sent to the `ArticlesController#index` action.

Let's see what the `ArticlesController` might look like:

```ruby
class ArticlesController
  def index
    if params.has_key?(:magazine_id)
      # index of nested resource
      @articles = Article.where(magazine_id: params[:magazine_id])
    else
      # index of top-level resource
      @articles = Article.all
    end

    render json: @articles
  end
end
```

The nested resource has a dynamic segment parameter `:magazine_id`
that will capture which magazine we are talking about.

## Restricting Member Routes

We can restrict what routes we build for a resource using the `:only`
option. Here, we tell the nested resource to only generate the
`:index` route.

If we didn't specifically restrict the routes, Rails would generate
all the typical routes for the nested resource:

```
# Collection Routes:
index: GET /magazines/:magazine_id/articles
new: GET /magazines/:magazine_id/articles/new
create: POST /magazines/:magazine_id/articles

# Member routes
show: GET /magazines/:magazine_id/articles/:id
edit: GET /magazines/:magazine_id/articles/:id/edit
update: PUT /magazines/:magazine_id/articles/:id
update: PATCH /magazines/:magazine_id/articles/:id
destroy: DELETE /magazines/:magazine_id/articles/:id
```

Here's a general design principle: **there should be exactly one URL
which maps to the representation of a resource**. The URLs
`/articles/101` and `/magazines/42/articles/101` would both route to
the same `Article`. One of these is superfluous.

Also, the `/magazines/42` bit of the `/magazines/42/articles/101` path
is redundant. `ArticlesController#show` doesn't need the magazine id
to find the article; it can just use the article id directly. If we
wish to use the `magazine_id`, we can always look it up from the
article id:

    Article.find(id).magazine_id

As a general rule, never generate any of the member routes when
nesting. Member routes should only belong to top level resources.
There's nothing wrong with defining the same resource at two
levels.

## Restricting Collection Routes

We now have three remaining collection routes we might nest:

```
index: GET /magazines/:magazine_id/articles
new: GET /magazines/:magazine_id/articles/new
create: POST /magazines/:magazine_id/articles
```

**I like nested `index` routes**. This should trigger an index action
to get all the articles belonging to the given magazine. Note that
this is different from the top level `/articles` index route; that one
should return **all** the articles in the system. Because it returns a
subset, `/magazines/:magazine_id/articles` does **not** repeat the top
level index route in the way nested member routes do.

**I don't like nested `create` routes**. `create` is superfluous like
the member routes. It doesn't do anything differently from the
top-level route. If you want to create a new `Article` for `Magazine`
123, you don't need to specify 123 in the `create` URL. Instead, you can
use a hidden field to upload the `magazine_id` via the HTTP POST body.
While you might think that you would prefer to encode the `magazine_id`
in the URL rather than a hidden field, we will see that having
non-nested `create` routes will make it simpler to define our React components
later on. Start practicing this pattern now, and **always `create` through a top-level route.**

A nested `new` route is okay. `/magazines/123/articles/new` can
present a form for an `Article` for `Magazine` \#123. It should still
post to `/articles`, though.
