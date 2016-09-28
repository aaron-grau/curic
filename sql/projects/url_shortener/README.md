# URL Shortener: Part SQL

In this project, we'll build a tool that will take an arbitrarily-long
URL and will shorten it for the user. Subsequent users can then give the
short URL back to our tool and be redirected to the original URL. We'll
also track clickthroughs, since these can be really helpful for business
analytics.

URL-shortening apps like ours are useful for embedding long URLs in
space-constrained messages like tweets. You can play around with
[Google's shortener][goo-gl] if you'd like to get a feel for how
this works.

Unfortunately, we don't know how to build things in the browser yet, so
we'll have to be content with a simple [CLI][what-is-cli] tool, though
we can use the `launchy` gem to pop open the original URL in a browser.

[goo-gl]: https://goo.gl
[what-is-cli]: http://www.techopedia.com/definition/3337/command-line-interface-cli

## Phase I: `User`

Go ahead and create a new rails project...

```
$ rails new URLShortener --database postgresql
```

Now use the Rails scaffolding engine to create a new migration file...

```
$ rails generate migration CreateUsers
```

This will automatically generate a migration that creates the `users`
table. This table needs only one column in addition to the ever present
`t.timestamps`, and that is `email`.

We will also [create an index][indexing-reading] for the email column in
the `users` table. This will allow us to look up rows in the table
much more quickly. In addition to improving lookup performance we
can also enforce uniqueness of one or more columns at the database
level using an index. [These docs][add-index-docs] will give you the syntax needed.

Double check that your migration file syntax is correct and then setup your database by running your migrations with: `rake db:migrate`.

Next, let's create a `User` model. No magic to this, just create a `user.rb`
file in your `app/models` folder.

Add uniqueness and presence [validations][validations-reading]. Without
these, people might go about creating user accounts without emails. We
cannot tolerate such misbehavior.

**NB: At this point in the curriculum, your projects have become large enough
that clicking on files in the file tree to navigate around will take a long time.  
Make sure to instead press ⌘+T and then type the file name to quickly find the
files you are looking for.**

**NB: the naming of your files is essential.** When you try to create an
instance of a model, it looks in the models folder for a file that is the
`snake_case`ified version of your model's name. Also, it will, by default,
infer that the name of the table is the pluralized, snake cased, version of your
model. For example, if I had a `GoodStudent` model, Rails would look in the
`app/models` folder for a file called `good_student.rb`. Upon finding and
loading this file, it would create an instance of the class with data from a
table it assumes to be `good_students`. **If your naming doesn't _EXACTLY_
follow convention, you're gonna have a bad time.**

[indexing-reading]: ../../readings/indexing.md
[validations-reading]: ../../readings/validations.md
[add-index-docs]: http://apidock.com/rails/ActiveRecord/ConnectionAdapters/SchemaStatements/add_index

## Phase II: `ShortenedUrl`

### Basic structure

Create a `shortened_urls` table and write a `ShortenedUrl` model. Store
both the `long_url` and `short_url` as string columns. Also store the id
of the user who submitted the url.

**NB:** `ShortenedUrl` is a model, `shortened_urls` is the table it's
connected to, and `short_url` is the string column in the
`shortened_urls` table that contains the actual shortened url string.
Confusing, I know, but this illustrates why good naming is so important.
One bad name confuses every poor dev who tries to maintain the code
after you.

When writing the ShortenedUrl migration remember that we want to be able to find urls owned by a user. We also eventually want users to be able to type in the short url and get back the long version. For which columns in `ShortenedUrl` should we add indices? Which index should be unique?

Along with adding these database level constraints remember to add uniqueness and presence validations on the model level as well.

Once you have your migration and model written how you would like, make sure to run your migrations and test out ShortenedUrl in the rails console.

### Why no `LongUrl` model?

We **could** factor out the `long_url` to its own model, `LongUrl`,
and store in the `ShortenedUrl` a key to the `LongUrl`. If the URLs
are super long this would reduce memory usage by not repeating the
long url in every shortened url. On the other hand, the long url is
already an ID (in the sense that all URLs are identifiers for web pages), so
it's not improper to duplicate, plus factoring it out into its own table will
force two steps of lookup to resolve a short URL:

0. Find the `ShortenedUrl` model
0. Find the associated `LongUrl`.

For this reason, we can expect better performance by storing the long
url in the `shortened_urls` table.

### `ShortenedUrl::random_code`

Now it's time for us to actually shorten a URL for the users. We do this by
generating a random, easy to remember, 16 character random code and storing
this code as the `short_url` in our table. Now, we can search for this record
by the `short_url` and we get the `long_url`.

We will be generating a random string with
`SecureRandom::urlsafe_base64`. In [Base64 encoding][wiki-base64],
each character of the string is chosen from one of 64 possible
letters. That means there are `64**16` possible base64 strings of
length 16.

Write a method, `ShortenedUrl::random_code` that uses
`SecureRandom::urlsafe_base64` to generate a 16 letter random code.
Handle the vanishingly small possibility that a code has already been
taken: keep generating codes until we find one that isn't the same as one
already stored as the `short_url` of any record in our table. Return the
first unused random code. You may wish to use the ActiveRecord `exists?` method;
look it up :-)

[wiki-base64]: http://en.wikipedia.org/wiki/Base64

### `ShortenedUrl::create_for_user_and_long_url!(user, long_url)`

Write a factory method that takes a `User` object and a `long_url`
string and `create!`s a new `ShortenedUrl`.

### Associations and testing

Write `submitter` and `submitted_urls` associations to `ShortenedUrl`
and `User`.

Go ahead and in the Rails console create some `User`s and some
`ShortenedUrl`s. Check that the associations are working.

## Phase III: Tracking `Visit`s

### Model

We want to track how many times a shortened URL has been visited. We
also want to be able to fetch all the `ShortenedUrl`s a user has
visited.

To accomplish this, write a `Visit` join table model. Add appropriate
indices and validations. Be sure to include timestamps on your `Visit` model, we'll need them later.

### `Visit::record_visit!(user, shortened_url)`

Add a convenience factory method that will create a `Visit` object
recording a visit from a `User` to the given `ShortenedUrl`.

### Associations

Write `visitors` and `visited_urls` associations on `ShortenedUrl` and
`User`. These associations will have to traverse associations in
`Visit`. Define appropriate associations in `Visit`; what kind of
association can traverse other associations?

**Important Note**: because a `User` can visit a `ShortenedUrl` many times,
there are potentially many `Visit` records connecting the same user to the same
shortened URL. Thus, your `ShortenedUrl#visitors` association may repeat the
same user several times, and your `User#visited_urls` association may repeat the
same shortened URL several times. We'll address this soon!

### `ShortenedUrl#num_clicks`, `#num_uniques`, `#num_recent_uniques`

Write a method that will count the number of clicks on a `ShortenedUrl`.

Next, let's write a method that will determine the number of **distinct** users
who have clicked a link.

How do we do this in ActiveRecord? In addition to our `visits` association, we
will want to:

* Use the [select](http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-select) method to select just the `user_id` column
* Use the [distinct](http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-distinct) method to de-duplicate the `user_id`s so that each user
  counts only once.
* Use the `count` method to count the unique users.

The SQL we want looks like this:

```sql
SELECT
  COUNT(DISTINCT user_id)
FROM
  visits
WHERE
  visits.shortened_url_id = ?
```

Lastly, count only unique clicks in a recent time period (say,
`10.minutes.ago`). This involves throwing a [where](http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-where) clause onto your
`num_uniques` code.

## Phase IIIb: de-duplicated `visitors` and `visited_urls`

You probably wrote a has_many association that looked like this:

```ruby
class ShortenedUrl < ActiveRecord::Base
  has_many(
    :visitors,
    through: :visits,
    source: :visitor
  )
end
```

To get this association to return each visitor exactly once, we can add a magic
"scope block" to ask Rails to remove duplicates:

```ruby
class ShortenedUrl < ActiveRecord::Base
  has_many(
    :visitors,
    Proc.new { distinct }, #<<<
    through: :visits,
    source: :visitor
  )
end
```

This will call `#distinct` on the visitors, returning only unique visitors. It
is common to write `-> { distinct }` for `Proc.new { distinct }`, because it is
a little shorter.

Use a "distinct-ified" version of `visitors` to rewrite `num_uniques` simply.
Also, write a distinct-ified version of `visited_urls`.

## Phase IV: A simple CLI

Write a very simple command-line interface in `bin/cli` (the convention for rails scripts is to omit the extension `.rb`). You already know how to do this-- you have written programs that had CLIs using functions like `puts` and `gets.chomp` (e.g., Chess, Minesweeper, &c.). Add these features:

* Ask the user for their email; find the `User` with this email. You
  don't have to support users signing up through the CLI.
* Give the user the option of visiting a shortened URL or creating
  one.
* When they select create a new short URL, create one and show it to
  them.
* Use the `launchy` gem to open a URL in the browser; record a visit.
  (You'll need to add `launchy` to your Gemfile and run `bundle install`)

Remember not to pollute your models with UI code. You should keep all of
that in your CLI script. Suppose you want to write a web version of this
program soon. The CLI interaction logic can't be reused in the web
version, but if you embedded that in your models, this might cause some
mysterious behavior in your web app.

Run your script using the `rails runner` command. This will load the
**Rails environment** for you, so you'll be able to use your classes
without requiring them explicitly. Importantly, `rails runner` will also
connect to the DB so you can query tables.

Here's an example of the CLI script in action. Your script should behave
something like this:

```
~/repos/appacademy/URLShortener$ rails runner bin/cli

Input your email:
> ned@appacademy.io

What do you want to do?
0. Create shortened URL
1. Visit shortened URL
> 0

Type in your long url
> http://www.appacademy.io

Short url is: Pm6T7vWIhTWfMzLaT02YHQ
Goodbye!

~/repos/appacademy/URLShortener$ rails runner bin/cli

Input your email:
> ned@appacademy.io

What do you want to do?
0. Create shortened URL
1. Visit shortened URL
> 1

Type in the shortened URL
> Pm6T7vWIhTWfMzLaT02YHQ

Launching http://www.appacademy.io ...
Goodbye!

~/repos/appacademy/URLShortener$ rails c
Loading development environment (Rails 3.2.11)
1.9.3-p448 :001 > ShortenedUrl.find_by_short_url("Pm6T7vWIhTWfMzLaT02YHQ").visits
  ShortenedUrl Load (0.1ms)  SELECT "shortened_urls".* FROM "shortened_urls" WHERE "shortened_urls"."short_url" = 'Pm6T7vWIhTWfMzLaT02YHQ' LIMIT 1
  Visit Load (0.1ms)  SELECT "visits".* FROM "visits" WHERE "visits"."shortened_url_id" = 1
 => [#<Visit id: 1, user_id: 1, shortened_url_id: 1, created_at: "2013-08-18 19:15:55", updated_at: "2013-08-18 19:15:55">]
```

## Phase V: `TagTopic`, `Tagging`s

Users should be able to choose one of a set of predefined `TagTopic`s
for links (news, sports, music, etc.). You should be able to query for
the most popular links in each category.

**NB**: the relationship between `TagTopic`s and `URL`s is many-to-many. You'll
need a join model like `Tagging`s.

## Phase VI: Add more validations

* Length of URL strings < 1024.
* A custom validation that no more than 5 urls are submitted in the
  last minute by one user.

## Phase VII: Premium users

Let's monetize our URL Shortener app.

+ Add a "premium" boolean column to your `Users` table; it should default to `false`.
+ Now add code to ensure that non-premium users can only create a maximum of
5 URLs (premium users get unlimited).

## Phase VII: Pruning Stale URLs

Write a `ShortenedUrl::prune` method that deletes any shortened urls that have
not been visited in the last (n) minutes. Write a [rake task][rake-tutorial] to
automate this process. Once you have the basic functionality, adjust it so that
URLs submitted by premium users are not pruned.

## Bonuses
* Alternative URL shortening strategies
  * Custom URLs for premium users
  * Series of random dictionary words
* Voting on URLs
  * Add a Vote model
  * Users can upvote (+1) or downvote (-1)
  * No more than one vote per user/url combo
  * Users cannot vote for their own URLs
  * `ShortenedUrl::top`, sorted by total vote score
  * `ShortenedUrl::hot`, sorted by vote score in the last (n) minutes

[count-distinct-docs]: http://api.rubyonrails.org/classes/ActiveRecord/Calculations.html#method-i-count
[rake-tutorial]: http://tutorials.jumpstartlab.com/topics/systems/automation.html
