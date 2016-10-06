# w6d5: AJAX Twitter

[**Live Demo!**][live-demo]

[live-demo]: https://aa-ajax-twitter.herokuapp.com

## Phase 0: Setup

Download the project [skeleton](skeleton.zip?raw=true). Start by running `rake
db:create db:migrate db:seed`. You will also need to run `webpack -w` to compile
the JavaScript.

Take a look at the `webpack.config.js`. Note that our entry point is
`frontend/twitter.js`, so our other JavaScript files should live in `frontend/`
too. Webpack will compile them from there and place `bundle.js` in
`app/assets/javascripts/`.

Next look at `app/assets/javascripts/application.js`. This is Rails' manifest
file for JavaScript. All required javascript files are listed in the comment
block at the top. This works in a similar fashion to placing `<script>` tags in
our HTML, except that Rails compiles them all into a single file for production.
But unlike Webpack, Rails doesn't intelligently manage dependencies, so you
still have to be extra careful about the load order.

It's currently only requiring jQuery. Make it requires `bundle.js` as well. Now
we shouldn't have to worry about it again because Webpack has our back.

## Phase I: `FollowToggle`

We will write a FollowToggle class that turns a button into a toggle that will
follow/unfollow a user.

First, let's modify the Rails view for the follow button to accommodate front-end
manipulation. Look at `app/views/follows/_form.html.erb`. Notice that there are
two branches of logic: the button will be a 'follow' button if the current user
is not yet following the user, and an 'unfollow' button if they are. We want to
replace the contents of this form with a single HTML element that gets updated
via our front-end javascript.

Replace the contents of the button form with a single `<button>`.  Give the
button a class of `follow-toggle`.  We'll also need to let the button know the
`user-id` and `initial-follow-state` ("followed" or "unfollowed") by storing
these in `data-*` attributes. Leave the inner HTML of the button empty: the
FollowToggle class will be responsible for setting this.

Now let's start writing the code for the `FollowToggle` class. Create a new file
in `frontend/` called `follow_toggle.js`.

**NB:** Each of your JavaScript classes for this project should be in a separate file in
`frontend/`. Name the files in snake_case.

Define the `constructor` for `FollowToggle`. In the `constructor`, extract the
`user-id` and `initial-follow-state` from `el` and save those in instance
variables `userId` and `followState` for later use. You might also find it
convenient to store a jQuery wrapped `el` as an instance variable.

Set 'module.exports' to your `FollowToggle` class to make it `require`-able.

Using this class, we can now build a `FollowToggle` instance for each `follow-toggle` button on the page.

**NB:** Though the follow state is stored in the Rails API as a **_boolean_**, on the
client side, we'll keep track of the follow state as a **_string_**. This is
because later we'll add more states in addition to followed/unfollowed.

You'll probably want to start testing this out about now. But if you run Webpack
at this point, nothing will get compiled because `twitter.js` (the entry point)
is empty, so let's fill it in. Require your new `FollowToggle`class at the top,
and define a document ready callback below. That callback should apply your
`constructor` to all `button.follow-toggle` elements. You can use
[jQuery#each][jquery-each] for this, but **beware**: the DOM element is the
_second_ callback argument; index comes first.

Once you're sure that your `FollowToggle` `constructor` is being called
correctly, write a `FollowToggle#render` method. Depending on
`this.followState`, the text should be `"Follow!"` if `this.followState ===
"unfollowed"`, and `"Unfollow!"` if `this.followState === "followed"`.

Call your `#render` method inside the `constructor` to initially set the inner HTML.

Next, write a `FollowToggle#handleClick` method. Install this click handler in the constructor. Your click handler should:
* Prevent the default action.
* Make a `$.ajax` request to `POST /users/:id/follow` if we are not following the user (check `followState`).
* Else, it should make a `DELETE` request.
* On success of the `POST`/`DELETE`, we should toggle the `followState` and re-render.

**Hint**: You probably want to set the `dataType` option for `$.ajax`. This way you can
have jQuery automatically parse the response as JSON. Read the documentation [here][$.ajax-docs]

You may also be wondering what's going on with the `respond_to` inside the
`FollowsController`. Well, when we make a http request to a server, we can specify
the `Content-Type` header. Meaning.. we can ask for HTML, XML, JSON, text, etc.
Until now, our controllers were apathetic towards the type of the request. Want JSON? TOO BAD! Here's HTML...

The browser sets this `Content-Type` header for us based on how we make the request.
When we use the `$.ajax` method, we will (by default) request JSON. The controller can
then react to this `Content-Type` request by using the [`respond_to` method][respond-to-docs].

[respond-to-docs]: http://apidock.com/rails/ActionController/MimeResponds/InstanceMethods/respond_to
[$.ajax-docs]: http://api.jquery.com/jquery.ajax/

Check to make sure this works!

Lastly, let's freeze-out the button so that people can't click it while the AJAX
request is pending. In `handleClick` set `followState` to `following` or
`unfollowing` and call `#render`. Update your `#render` method to set the
`disabled` property if the `followState` is `following` or `unfollowing`;
otherwise, make sure `disabled` is set to false. (hint: Use jQuery's `#prop`
method.)

Check that everything works and call over your TA so that they can check your work!

[jquery-each]: https://api.jquery.com/each

## Phase II: `UsersSearch`

Review `app/controllers/users_controller.rb` and
`app/views/users/search.HTML.erb`. We want to create real-time user search. On
every keypress as the user types in a username, we'll show the matching users
for the current input.

To do this, we'll write a `UsersSearch` class. Replace the entire form with a
`nav` with class `users-search`. Add an input field for the user to type the
name. Also nested in the `nav.users-search`, have a `ul.users` for displaying
results.

Next, begin writing the `UsersSearch` class. As before, automatically build a
`UsersSearch` for each `nav.users-search`. Again, you might find it convenient
to store jQuery wrapped versions of the `el`, its `input` and its `ul`. Also in
the constructor, we'll be installing a listener for the `input` event on the
input tag.

Write a `UsersSearch#handleInput` handler. On each `input` event, make an AJAX
request to `/users/search`, sending the input's `val` as the query parameter.
You can send query parameters along with an `$.ajax` call through the `data`
option. Don't forget to set `dataType`!

Now, let's set up your controller to respond to AJAX requests with JSON. Because 
your controller will be handling both HTML and JSON requests, let's separate out 
each of those types of requests and respond to them separately. Put the following 
code into your controller to replace the line reading `render :search`:

```ruby
respond_to do |format|
  format.html { render :search }
  format.json { render :search }
end
```

This tells your controller to render the `:search` HTML view for requests that 
want HTML and to render the `:search` JSON view for requests that want JSON. But 
we don't yet have a `search.json` view! Let's make one. The file, in the `/users/` 
folder, should be named `search.json.jbuilder` and should contain the following code:

```ruby
json.array!(@users) do |user|
  json.(user, *User.column_names)
  # Hidden N+1 query!
  json.followed(current_user.follows?(user))
end
```

The above code takes your `@users` instance variable and turns it into an array 
of JSON objects. Each object will have all of its information as well as `followed`, 
which will be either true or false depending on whether the current user is following 
this user.

When the AJAX call successfully returns a list of matching users, we want to
display those results in the `ul.users`. Write a method
`UsersSearch#renderResults` for your AJAX success handler. This should first
empty out `ul.users`. Then it should iterate through the fetched array of users.
For each result, it should use jQuery to build an `li` containing an anchor tag
linking to the user. Use the jQuery `append` method to add each result to the
`ul`.

Check that you can now interactively search users.

Last, we want to add follow toggle buttons for each of these results. When
building the `li` tags for each user, build a `button`, too. You can create a
FollowToggle instance for the button to setup the follow toggle.

**NB:** Inspect the JSON objects that you are getting from the server to see whether or
not they are currently being followed.

You could make this work by setting data attributes on the button for `user-id`
and `initial-follow-state`. In this context, that's kind of annoying. Instead,
it is common to allow jQuery plugins to take options. I modified my
`FollowToggle` like so:

```js

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = (this.$el.data("initial-follow-state") ||
                        options.followState);
    // ...
  }
}
```

See if this helps you set up the follow toggle.

## Phase III: `TweetCompose`

First, we're going to update our TweetsController to handle JSON requests, similarly 
to how we updated our UsersController before. If we've successfully created a tweet from 
a JSON request, then we should render that tweet back as json. We could `render json: 
@tweet`, but then we might not have all of the information we need. Add a `respond_to` 
block and put cases for `format.html` and `format.json` inside it. If the request 
matches `format.json`, call `render :show` so that we can structure our response to our 
application's needs.

Now, just as we did before, let's create a show view for our tweets. We're going to call 
a partial in this view; to that end, we'll put the following code in `show.json.jbuilder`: 

```ruby
json.partial!("tweets/tweet", tweet: @tweet)
```

Partials in Jbuilder work the same way they do in ERB - the partial file name starts with 
a `_` and you pass in a piece of information for the partial to render using a hash. Let's 
create that partial right now at `_tweet.json.jbuiler` and put the following code into it:

```ruby
json.(tweet, *Tweet.column_names)

json.user(tweet.user, *User.column_names)

json.mentions(tweet.mentions) do |mention|
  json.(mention, *Mention.column_names)
  json.user(mention.user, *User.column_names)
end
``` 

What this code is doing is collecting the tweet's information, the tweeter's information, and also information about each of that tweet's mentions.

Write a `TweetCompose` class. First, change `app/views/tweets/_form.HTML.erb`.
Give the form a class `tweet-compose`. Write a TweetCompose class that grabs
this form and installs itself.

In the `TweetCompose` `constructor`, install a `submit` event handler. Write a
`TweetCompose#submit` method that uses `serializeJSON` to build JSON from the
form contents and use `$.ajax` to submit the form.

As before, disable the form when the submit is made. You can't disable an entire
form, so you'll have to disable all the inputs. To get all the inputs, use
jQuery's [`:input` pseudo-CSS selector][input-selector]. Make sure not to
disable your inputs until after you've serialized the form contents, or their
values will be ignored :(

[input-selector]: http://api.jquery.com/input-selector

Write a `TweetCompose#clearInput` method to empty out all the inputs after a
tweet is successfully created. Write a `TweetCompose#handleSuccess` method. This
should call `clearInput` and re-enable the form.

In `#handleSuccess`, we also want to insert the created tweet into the list of
all tweets. How does `TweetCompose` find the `ul` of tweets? We can set a data
attribute on the form where the value is the selector that corresponds to the
target `ul`. For example, if we give the target `ul` an id of `#feed`, we can
give our form the following data attribute: `data-tweets-ul="#feed"`. Our
`TweetCompose` can pull out this data attribute and use the selector `#feed` to
find the ul. This is better than hard coding `#feed` into the JS.

A successful AJAX post request for a tweet should return back the newly created
tweet in JSON format. For simplicity, have `TweetCompose` call `JSON.stringify`
on the created Tweet. Build an `li` with the JSON content, and stick it in the
`ul`. We'll actually render this nicely in a later phase.

Finally, let's add a counter that will show the number of characters remaining
for a tweet (starting at 140). Add a `strong` tag with class `.chars-left` to
the form. In the `TweetCompose` `constructor`, add an `input` event handler on the
`textarea`. In it, update the `strong` tag with the number of characters
remaining.

Call your TA over to check your work!

## Phase IV: `TweetCompose`: Mentioned Users

The next part is to allow us to tag multiple users in a tweet. Right now we can
select a single user to tag. Our killer feature will be to dynamically create
more select tags so we can tag more users.

Rather than have just one select tag visible all the time, we want to have no
select tags to start. Instead, we want to show an "Add mention" link which will
let us add multiple select tags to the page.

To do this, first move the `select` tag into a `<script type="text/template">`
tag. This tells the browser not to put the `select` in the DOM. If you reload,
you should see no select tag.

Write an "Add mention" anchor tag. Give it a phony href
(`href="javascript:void(0)"` is typical). Also give it a class
`add-mentioned-user`. I also added a `div.mentioned-users` that will house all
these newly generated select tags.

In the `TweetCompose` `constructor`, add a listener for a click on
`a.add-mentioned-user`. I wrote a `TweetCompose#addMentionedUser` method. I used
jQuery to find the `script` tag, I grabbed the HTML from within using
`$scriptTag.html()`, then appended it into the `mentioned-users` div.

Test this out and make sure you can create new `select` tags by clicking the link.

Next, I also want to be able to **remove** select tags. Say we clicked "add"
accidentally and want to remove the `select`. To do this, I modified the script
template slightly. I put the `select` in a `div`. In the same div, I wrote an
anchor tag with class `remove-mentioned-user`. I gave it a similar bogus `href`
attribute.

In the `TweetCompose` `constructor`, I listened for `click` events on
`a.remove-mentioned-user`. **You have to use event delegation here: why?** I
wrote a `TweetCompose#removeMentionedUser` which used the `event.currentTarget`
to learn which remove anchor tag was clicked, and removed the parent `div`
element. This removes both the anchor tag and the select, too.

Check that this is working.

Lastly, we want to update `TweetCompose#clearInput` to clear out all the selects
after form submission succeeds. You should have been putting all your select
tags into a div with class `.mentioned-users`. In `#clearInput`, I grab this div
and `empty()` it.

## Phase V: Infinite Tweets

Right now we send all the tweets down when the user requests `/feed`. If there
are many, many tweets in the feed, this will send a huge amount of data to the
user. Moreover, the user is likely to be interested in only the most recent
tweets.

Let's **paginate** the sending of tweets. To start, open up
`app/models/user.rb`. Modify the `#feed_tweets` method to send only up to
`limit` tweets. Also, modify it not to return any tweets created after
`max_created_at`. Test this out in your Rails console before moving to the
JavaScript portion.

Next, let's begin modifying the `app/views/feeds/show.HTML.erb` template. You
should have a `ul#feed` from phase III. Wrap that `ul` with a `div` with class
`infinite-tweets`. You can empty out the contents of the `ul#feed` since we'll
be adding the tweets inside dynamically with jQuery now. Also, write an anchor
tag with class `fetch-more`; this link will be clicked to load more tweets.

Begin writing an `InfiniteTweets` class. Listen for clicks to fetch more; begin
writing an `InfiniteTweets#fetchTweets` method.

In `#fetchTweets`, make an AJAX request to `/feed`. In the success handler, call
an `#insertTweets` method. For simplicity, for each tweet, just append `<li>`
items with `JSON.stringify(tweet)` into the appropriate `ul`.

As we did before, we're going to have to update our FeedsController to handle JSON requests. Replace the `render :show` line in `FeedsController#search` with the following code:

```ruby
respond_to do |format|
  format.html { render :show }
  format.json { render :show }
end
```

Now, also in a repetition of our earlier process, let's build out the rest of our JSON API. We'll start by creating a `feeds/show.json.jbuilder`. We can reuse the tweet partial we already wrote by calling it in this show view:

```ruby
json.array!(@feed_tweets) do |tweet|
  json.partial!("tweets/tweet", tweet: tweet)
end
```

If you click the link twice, you'll fetch the same set of tweets twice. We need
to send the `max_created_at` parameter. In the `InfiniteTweets` `constructor`,
start `this.maxCreatedAt` at `null`. In the `#fetchTweets` method, if
`maxCreatedAt != null`, send it in the AJAX `data` parameter. (Notice the often
confusing mix of Ruby and JS naming conventions).

When successfully fetching tweets, record `max_created_at` by looking at the
`created_at` attribute of the last tweet fetched. This should ensure that each
call to `#fetchTweets` fetches the next set of tweets, chronologically.

Once you've fetched all the tweets, you should remove the "Fetch more tweets"
link and replace it with a message that there are no more tweets to fetch. You
can tell there are no more tweets to fetch if `< 20` tweets are returned.

## Phase VI: jQuery Triggering

There is one last step. Your `TweetCompose` also tries to insert tweets into the
feed. Should we copy over all the logic of `InfiniteTweets` into `TweetCompose`?
That doesn't sound very DRY.

Instead of having `TweetCompose` insert HTML into the DOM, have it
`jQuery#trigger` an `insert-tweet` event on your `#feed` ul. This is a **custom
event** (not a pre-defined browser event) that you can use so that one module of
code can signal another module. Here, this allows `TweetCompose` to remain
agnostic of how a new tweet is inserted; by triggering the custom event,
`TweetCompose` simply notifies `InfiniteTweets` to do the work of insertion.

Add a listener for `insert-tweet` in the `InfiniteTweets` class and have it fire
an `InfiniteTweets#insertTweet` method. When you trigger the event from the
`TweetCompose` class, be sure to pass the newly created tweet's data along as
well.

**Common bug**: You may also want `insertTweet` to update the the `lastCreatedAt` instance
variable. If you were to compose a tweet and not set `lastCreatedAt`, you'll
fetch the same tweet again when you make an AJAX call to `/feed`.

## Phase V: Jbuilder Practice

Since we're going to be using Jbuilder so often over the next few weeks, let's 
get some more practice with it today. We'll start by creating a simple view for 
our FollowsController to use. In both its `create` and `destroy` methods, 
the FollowsController calls `render json: @follow`. Replace that with 
`render :show` and write a `show` view in Jbuilder. This view should have the 
same effect as calling `render json: @follow` - all of the follow's information 
should get sent to the frontend.

Test your new view by creating and destroying `Follows` using your app. Does it 
still work?

Next, we'll work on a `show` view for users. In a full Rails API backend, we might use 
this view when a user is created, destroyed, or shown, as well as whenever a user 
logs in or out. This view should be similar to the view we just wrote, with one 
crucial difference: we need to keep our users' private information from being sent 
over the internet. Write a `users/show.json.jbuilder` that only returns a user's 
`username` and `id`, keeping their `password_digest` and `session_token` safe on 
the server.

Test your new view by modifying your `User#create` method to `render :show` when it 
receives a JSON request. Does your view send back the correct information if you test 
it using Postman? After your test succeeds, change your controller code back.

Finally, we'll write an `index` view for tweets. This view isn't strictly applicable 
to our current application, but it demonstrates a pattern that you will use in 
future full-stack applications, particularly when we start using Redux. We're going 
to return an object filled with tweets, each tweet keyed by its id. It will look like 
the following:

```js
{
  "1":{
    "content":"Set world napping record",
    "user_id":1
  },
  "2":{
    "content":"Jumped to the top of the shelf!",
    "user_id":1
  },
}
```

Write a `tweets/index.json.jbuilder` that returns an object full of tweets. Create 
a `Tweets#index` method and route, and render your new index view in it. Test your 
new code by navigating to `localhost:3000/tweets`.

Next, include the tweeter's username along with each tweet. Prevent n+1 queries by 
using `includes`. Check your server log and make sure that only two queries are being 
fired to display all of the tweets and usernames.

Next, include a list of each tweet's mentioned users along with each tweet. Make sure 
to add `:mentioned_users` to your `includes` statement to prevent n+1 queries. Test 
your new code by navigating to `localhost:3000/tweets` - your returned JSON should look 
like this:

```js
{
  "1":{
    "content":"Set world napping record",
    "user_id":1,
    "username":"breakfast",
    "mentioned_users":[]
  },
  "2":{
    "content":"Jumped to the top of the shelf!",
    "user_id":1,
    "username":"breakfast",
    "mentioned_users":[]
  },
}
```

## Bonus: Underscore Templates

When we fetch the tweets, we don't just want to stick the JSON representation
in; we want to render a partial to insert HTML into the page.

In theory, we could build HTML in JavaScript. This would be tortuous as the HTML
got more sophisticated. Just like we use ERB in Ruby, we'll use another
templating language called Underscore templates in JavaScript. Download the
underscore.js library. One option for doing so is the [underscore-rails
gem][underscore_rails].

In your `div.infinite-tweets`, make a `<script type="text/template">` as before.
Inside here, write an Underscore template that iterates through a `tweets`
array, building one `li` for each. This is a lot like Ruby, except:

```
<% tweets.each do |tweet| %>
  ...
<% end %>

VS.

<% tweets.forEach(function (tweet) { %>
  ...
<% }); %>
```

But don't forget to use double-percents (`%%`) so ERB doesn't try to interpret
your Underscore template code as Ruby. See [this example][underscore_erb] for a
refresher on how this works.

As you did for `TweetCompose`, have your `InfiniteTweets` find the template and
extract it. Modify the `#insertTweets` method. Take the template code and pass
it to the `_.template` method, which will build a function from your Underscore
template code. Call the compiled template function, passing in `{ tweets: tweets }`,
which makes the tweets variable available to the template. Insert the rendered
partial.

Check that this works. Call your TA over to double check your work.

[underscore_rails]: https://github.com/rweng/underscore-rails
[underscore_erb]: ../../readings/underscore-templates.md#erb--underscore