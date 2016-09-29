# Debugging Rails

Congratulations, you can write a Rails
application! Now it's important to learn how to debug Rails
applications well.

### Before we start

Bugs happen. Don't be afraid of trying something because you are
scared it might not work. Part of being a programmer is givng your crazy ideas a shot to see if they work. That is
why you have Git at your disposal; remember to use Git as a safety net
that WILL save you if you ever mess up really badly.

### Google is your friend

When it comes to Rails, chances are that someone has asked the exact
same question as you before. StackOverflow will generally have a
question related to yours on it. Be sure to get into the habit of
googling when something goes wrong or you don't know something. Your
TA is always happy to help, but when you leave AppAcademy, your TA
won't be there for you. Part of being a good developer is knowing how
to find the answers yourself.

## Byebug

Models are tucked away from you and aren't openly exposed through a UI
like views and controllers. This may make it a little more difficult
at times to work out if something is going wrong in your
model. However, this is where error messages will become your
friend. Look out for things that relate to your models such as:

  * Unknown attribute XYZ
  * Undefined method ABC for XYZ

Models behave fairly similarly to classes that you would have written
in the first few weeks of App Academy. Why? Because they are classes
themselves, just with extra Rails functionality built into them.

Therefore to debug them, we make use of our good friend: `byebug`.

Add `gem 'byebug'` to your `Gemfile` and `bundle install`.

If you need a refresher on byebug and debugging, be sure to have a 
look over the previous [reading][debugging-reading].

You can also type

```ruby
(byebug) help
```

inside of byebug to get a list of commands that are
available for use.

[debugging-reading]: ../../ruby/readings/debugger.md

## Better Errors

**NB**: The latest version of `better_errors` requires ruby 2+. If 
your ruby version is not up to snuff 
[upgrade with these instructions][ruby-setup].

So now you can debug your models like a pro, but that's only 1/3 of
the battle. Being able to debug your controllers is a crucial skill
and one that you should make sure that you are comfortable with.

It's important that you can realize when something is going wrong in
your controller, for example maybe an object isn't being created
properly from your params or you aren't being sent the right params in
the first place.

In order to debug our controllers, we are going to start using these
two gems:

```ruby
# Gemfile
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
end

# It's important that these go in a development group. If you have
# these available in production mode, then when you launch your site,
# if an error occurs, users will have access to your code and be able
# to do things like User.destroy_all
```

Better Errors will make your error pages a lot nicer to read, you will
be able to get stack traces as well as see useful information such as
params.  (Note that Better Errors causes issues with RSpec, and you
should probably not use it during assessments.)

`binding_of_caller` gives you an interactive REPL inside the
`better_errors` page. It's like a cross between the debugger and pry,
except you can use it in the browser. This is very useful for
inspecting values that you have assigned and testing your code as it
runs.

Using `better_errors` and `binding_of_caller` is required. Always set
this up. :-)

**Using Better Errors**

Better errors is going to open up whenever our code throws an
exception of some sort. What happens if our code isn't
throwing an error, but doesn't work the way that we want it to?

Well luckily our controllers have a method called `fail`. By typing
fail in a controller, it basically pauses your code at that point and
will open up better errors. EG:

```ruby
# app/controllers/posts_controller.rb

class PostsController < ApplicationController
  def create
    @post = Post.new(params[:id])
    fail

    if @post.save
      redirect_to @post
    else
      flash[:errors] ||= []
      flash[:errors] << @post.errors.full_messages.to_sentence
      render :new
    end
  end
end
```

With this fail, our code will stop just after `@post =
Post.new(params[:id])`, we can now do things like `p @post` and try to
save it manually to see what's going wrong with our code.

Using `fail` is very useful and is something you should do often. It
will allow you to step into your controller as it runs and make sure
things like params are coming in correctly.

**Useful things to do inside of a controller when debugging**

* Check what the params are
* Try `@object.save`. If it returns false then call `@object.valid?`
  And check `@object.errors.full_messages`. This will allow you to see
  what validations are failing.
* Make sure things like `current_user` are working.
* Make sure instance variables are set correctly.
* Check that you have called `permit` on the params when building
  objects.
* Check that objects being built via associations are built
  correctly. EG: `current_user.posts.new(post_params)`

[ruby-setup]: https://github.com/appacademy/meta/blob/master/setup/ruby.md#rbenv-and-ruby
