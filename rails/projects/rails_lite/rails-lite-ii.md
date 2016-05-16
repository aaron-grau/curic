# Rails Lite II: Bonus

Welcome to the bonus! From here on out, things will be a bit different.
You will no longer have specs to guide you, and TA help will be limited.
These phases are meant to be harder than the previous ones, so don't be
discouraged if you're struggling with them. Keep at it!

## Phase VII: Finish ActiveRecord Lite!

If you have not completed up to and including `has_one_through` in the
ActiveRecord Lite project, do so now. This project is crucial to your
understanding of Ruby, Rails, and SQL. Challenge yourself and finish this
amazing and difficult project!

## Phase VIII: Flash

The `flash`, like `params` and `session`, is a method that will return a
hash(like) object when it is called. Like the others it will build this
hash(like) object from the request. The behavior of the flash is unique,
however. When we set a value in the `flash` it should be available for the
current *and next* request cycle. Here's a [link to the docs][flash-docs]
if you need to refresh yourself on its exact behavior.

Create a `Flash` class. It will receive the request. Like the `session` the
`flash` should retrieve its contents from a cookie. We do require you to
implement `flash` as well as `flash.now`. 

Hints: 
- Keep in mind that items stored in `Flash` exhibit two different types of
behaviors; some persist to the next request, while others disappear with the
controller. It might be a good idea to store these items differently.
- Cookies store not only a given name and domain, but also the specific 
path of the request. Make sure the cookie's path is set to `/` like the
`session` cookie.
This will ensure that we're always dealing with the same cookie when inspecting 
and resetting the flash store.

We won't provide any more detailed instructions at this stage as this is a 
bonus problem! You can do it!

[flash-docs]: http://guides.rubyonrails.org/action_controller_overview.html#the-flash

## Phase IX: Rack Middleware - Exceptions ##

Let's add some middleware to our application to make it even more powerful!
Right now if our application encounters a Runtime exception, the server just
returns `Internal Server Error`. This is a pretty scary and unhelpful error.
Let's make a middleware that returns a nicely formatted error page just like
Rails does! Your middleware should minimally render the following:
- The stack trace
- A preview of the source code where the exception was raised
- The exception message

Hints:
- Make a new bin file that will use `Rack::Builder` to add your new middleware
- Your middleware should wrap the call to the next application in the stack in a
  `begin` `rescue` block so that it can handle an exception created by the
application
- Make a fancy `html.erb` template that will be rendered when an exception is
  rescued

[exception-docs]: http://ruby-doc.org/core-2.1.2/Exception.html

## Phase X: Rack Middleware - Static Assets ##

Now that you're a middlware pro, let's make another. This time let's make a
middlware that will serve up static assets like images, javascripts, and
arbitrary files.

Find an image that you like and place it in the root directory of your project.
Try navigating to `localhost:3000/yourImage.jpg`. You'll see that all that it
happens is your app can't match the route so it returns nothing. Let's change
that.

Make sure to set up your middleware so that all of the assets are served out of
a directory specified in the middle like `/public` for example. That way you
don't have to worry about users accessing any files that they want in your
filesystem.

Make sure to set the [mime-type](https://en.wikipedia.org/wiki/MIME) in the
headers using the `Content-type` header. Modern browsers are smart enough to
figure out what to do with the file for some types based upon information 
like the file extension, but your middleware should comply to the HTTP standards
and set the header.

Hints:
- Match the path of the request and a `root` path like `/public` similar to the
  AdminAuth demo.
- Reading a file using `File::read` and writing all of it to the response will
  actually serve the file to the browser.


## Phase XI: CSRF Protection

Remember the `authenticity_token` and `protect_from_forgery`? In this bonus
problem we will recreate this functionality to protect our web application from
nefarious hackers. Read [this guide][rails_csrf_guide] to learn more about
`protect_from_forgery`. Implement it yourself! This phase should also use the
cookies!

Hints:
- CSRF is used to determine if a form is valid. You need to provide a way for a
developer to include a CSRF token in their form.
- What will you compare the form's CSRF token to? Keep in mind that you don't 
have a database.

## Phase XII: Super Bonus: Rails Lite + ActiveRecord Lite

You are here which means you crushed ActiveRecord Lite as well as the Rails Lite
project. Time to take it to the next level and combine them into an actual living
breathing Rails machine!

First, refactor your ActiveRecord Lite project. Get rid of all the phase crap.
That will only make your life more difficult. Don't worry about the specs, we
wont need those where we're going!

Next, combine Rails Lite and Active Record Lite! Your should be able to write a
working web application with these two projects together.

Double extra credit if you make an app with this framework. Check out
[this excellent guide][go-live] from rockstar alum @ironunicorn.

[go-live]: http://restful-cats.com/go_live

Triple extra credit if you implement `rails new`.

## Phase XII: Monster Bonus

Time to become a rails guru! Some more awesome rails_lite features:
- Right now your app can't handle "PATCH" or "DELETE" requests. Fix this!
- Implement `link_to` and `button_to`
- Strong params (e.g `require`, `permit`)
- URL route helpers (e.g. `users_url` instead of `"/users'`)

[rails_csrf_guide]: http://guides.rubyonrails.org/security.html#cross-site-request-forgery-csrf
