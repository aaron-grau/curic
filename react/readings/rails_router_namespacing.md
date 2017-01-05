# Namespacing

Although we can rely on Rails content-type routing to delineate what type of
HTTP responses our web app generates, a better pattern is to nest our API
endpoints under a namespace.

A **namespace** is just a subset of controllers that live under a specific URL.

We'll start off by creating a new controller: `rails g controller api/cats`,
which is created in the `app/controllers/api/cats_controller.rb` file. Then we
need to tell our router about our new controller:

```rb
# config/routes.rb

namespace :api do
	resources :cats, only: [:index]
end
```

Running rake routes, we get:

```
  Prefix Verb URI Pattern         Controller#Action
api_cats GET  /api/cats(.:format) api/cats#index
```

Finally, we have to store our `index.json.jbuilder` view in the location 
`app/views/api/cats/index.json.jbuilder` so our new `Api:CatsController` can
find it. Now we can access our api endpoint on `localhost:3000/api/cats`.
