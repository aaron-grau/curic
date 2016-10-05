# Using Rails as an API

So far, we've used Rails to handle all the different parts of our web
application stack:

	0.	database management (ActiveRecord )
	0.	request routing (router and controllers), and 
	0.	rendering the user interface (views).

While Rails certainly excels at all these things, we're now moving into the next iteration of our web-application stack: client-side rendering. Going forward, we'll be applying more and more Javascript when rendering our pages to create dynamic content. This means that we'll be relying on Rails HTML views less and less. Eventually, our Rails **endpoints** (controller actions) will stop serving HTML and only serve database information (as `json`) to be used by our client-side rendering scripts. When a web server provides non-UI formatted information like this, we call it a **web API**.


## What is an API?

From [Wikipedia][wiki]:  

	A **server-side web API** is a programmatic interface consisting of one or
	more publicly exposed endpoints to a defined request-response message system,
	typically expressed in JSON or XML, which is exposed via the web—-most commonly
	by means of an HTTP-based web server.

The Rails projects we've done so far haven't been APIs, because they've tightly
coupled database information to a pre-defined set of fixed UI-templates
(our views). To make Rails an API, we're going to rewrite those views so that they serve up raw JSON information instead of HTML; we'll call these views **endpoints**.

This setup will let us write client-side Javascript that utilizes our endpoints
to render our UI by dynamically requesting, posting, and displaying server
information.

## Example

### Static HTML Implementation (The old way)

Take a look at this `CatsController`:

```ruby
	# app/controllers/cats_controller.rb

	class CatsController < ApplicationController
		def index
			@cats = Cat.all
			render :index
		end
	end
```

It should render the following template whenever we visit `localhost:3000/cats`:

```html
	<!-- app/views/cats/index.html.erb -->
	<h1> Cats </h1>
	<ul>
	<% @cats.each do |cat| %>
		<li><%= cat.name %>: <%= cat.color %></li>
	<% end %>
	</ul>

```

Let's go ahead and change this around to be an API. We want `localhost:3000/cats` to no longer give us a static HTML page, but rather a text-based representation of said cats that our client-side Javascript can use to render a dynamic view.

## API Implementation (The new way)

Our application needs to be able to respond to client-side requests for JSON. Lucky for us, Rails is smart enough to route HTTP requests for different data types to the corresponding views for that type. If a request with a header for `Content-Type: application/json` comes in, `CatsController#index` will automatically try to render  `app/views/cats/index.json.jbuilder` instead of the `app/views/cats/index.html.erb` view we wrote earlier. All we have to do is write that view:

```ruby

	# app/views/cats/index.json.jbuilder

	json.array! @cats

```

Don't worry if you've never heard of jbuilder. It's just a gem that lets us write Ruby to create JSON, like ERB is for creating HTML. jbuilder lets us render a json array of cats by simply passing `@cats` to the `json.array!` method.

## Using the API

If we now use our client-side rendering scripts to make an AJAX `GET` request to
`localhost:3000/cats`, instead of the HTML, we'll get a string of text that
looks something like this:

```json
	[
		{id: 1, name: "Amitabh", color: "Gray"},
		{id: 2, name: "Fabio", color: "Calico"}
	]
```

Our client-side JS can then parse and use the information easily to present our
information in dynamic (i.e. programmable) ways.

**Note:** we can still get our old HTML view by making a `text/html` request to
`localhost:3000/cats`, but at this point, who'd want to? STOP LIVING IN THE
PAST.

## Nesting API resources

Although we can rely on Rails content-type routing to delineate what type of HTTP responses our web app generates, a better pattern is to nest our API endpoints under a namespace.

A **namespace** is just a subset of controllers that live under a specific URL. 

We'll start off by creating a new controller: `rails g controller API:cats`, which is created in the `app/controllers/api/cats_controller.rb` file. Then we need to tell our router about our new controller: 

```rb
	# config/routes.rb

	resources :cats, only [:index]

	namespace :api do 
		resources :cats, only [:index]
	end

```

Running rake routes, we get: 

```

```


[wiki]: https://en.wikipedia.org/wiki/Web_API