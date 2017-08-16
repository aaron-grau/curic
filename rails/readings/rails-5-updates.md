# Rails 4 vs Rails 5

Rails 5 was released in June 2016. While App Academy's curriculum has
been updated to Rails v. 5.1.2, not all companies have necessarily made
the transition and are still working with Rails 4.  This document lays
out the primary differences between Rails 4 to Rails 5. You may notice
some of these differences in the video lectures (which still use Rails
4).

## Models

### `ApplicationRecord`

In Rails 5, we have an `application_record.rb` in our `models/` folder
containing an intermediary class called `ApplicationRecord`, which
inherits from `ActiveRecord::Base`. In Rails 4, each of our models
directly inherited from `ActiveRecord::Base`.

In Rails 5, we have this:

```ruby
class Cat < ApplicationRecord
end
```

In Rails 4, we would have this:

```ruby
class Cat < ActiveRecord::Base
#...
end
```

This change accomplishes two things:

* It follows the naming pattern set up by `ApplicationController`.
* It prevents us from having to monkey-patch `ActiveRecord::Base`
itself.

You can read more on this
[here](http://blog.bigbinary.com/2015/12/28/application-record-in-rails-5.html).

### Validation of `belongs_to` Associations

It's very common for `belongs_to` associations to be required. In Rails
4, this meant adding a separate validation on the `presence` of the
association. Rails 5, however, automatically validates these
associations for us.

#### Allowing for optional `belongs_to` associations

To make `belongs_to` associations optional, we need to add `optional:
true` to the association's options hash.

In the following example, the `presence` of a home is automatically
being validated:

```ruby
class Cat < ApplicationRecord
  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home
end
```

If we specifically wanted to allow for the `home` association to be
optional, we'd have to do the following:

```ruby
class Cat < ApplicationRecord
  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home,
    optional: true
end
```

#### Double Errors on `belongs_to` Associations

Because Rails now automatically validates `belongs_to` associations, we
don't want to explicitly add the validations ourselves. We don't want to
do so because this puts us in a position where there will actually be
two errors for the lack of a single association. Take the following
example:

```ruby
class Cat < ApplicationRecord
  validates :home, presence: true

  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home
end
```

If we try to `save` and invalid cat, we'll get the following:

```
irb(main):001:0> c = Cat.new(name: 'Callie')
=> #<Cat id: nil, name: "Callie", home_id: nil, created_at: nil, updated_at: nil>
irb(main):002:0> c.save!
   (0.1ms)  begin transaction
   (0.1ms)  rollback transaction
ActiveRecord::RecordInvalid: Validation failed: Home can't be blank, Home must exist
```

Notice the `Home can't be blank` and the `Home must exist`.
That's problematic when users see these errors.

However, if we just leave out the `validate :home, presence: true`, then
we get the correct, single error:

```ruby
class Cat < ApplicationRecord
  belongs_to :home,
    primary_key: :id,
    foreign_key: :home_id,
    class_name: :Home
end
```

Now we're all good:

```
irb(main):001:0> c = Cat.new(name: 'Callie')
=> #<Cat id: nil, name: "Callie", home_id: nil, created_at: nil, updated_at: nil>
irb(main):002:0> c.save!
   (0.2ms)  begin transaction
   (0.1ms)  rollback transaction
ActiveRecord::RecordInvalid: Validation failed: Home must exist
```

### `through` Association Ordering

If you have a `through` association defined before the association that
it goes through, you'll need to switch the ordering. For example, if I
were to have this:

```ruby
class Cat < ApplicationRecord
  has_many :friends,
    through: :owner,
    source: :friends

  belongs_to :owner,
    class_name: :User
end
```

I'll get a warning about placing the `:friends` before the `:owner`.
I should instead of have this:

```ruby
class Cat < ApplicationRecord
  belongs_to :owner,
    class_name: :User

  has_many :friends,
    through: :owner,
    source: :friends
end
```

## Controllers and Views

### `head :no_content` Errors Replace `MissingTemplate` Errors in Rails 5

In Rails 4, forgetting to add a Rails view for a controller action would
raise a `MissingTemplate` error. Rails 5 just returns a `head
:no_content` instead. (If you don't know what `head :no_content` is,
please read
[this](https://stackoverflow.com/questions/14716151/why-does-rails-want-to-return-head-no-content-for-json-put-requests).)

### `render :text` is Deprecated in Rails 5

Use `render :plain` instead. `render :text` will not work.

## Other Changes

### `rails` Replaces `rake`

Instead of `rake db:somecommand`, you can now do `rails db:somecommand`.

Note that using `rake` still works, but using `rails` standardizes Rails
commands in the terminal.

### Migrations

Previously, migrations inherited from this: `ActiveRecord::Migration`.
Now, they inherit from this: `ActiveRecord::Migration[5.1]`.

### Gems for Testing

#### `shoulda-matchers`

Currently, `shoulda-matchers` requires a specific branch.
If you're using `shoulda-matchers`, make sure your `Gemfile` has this:

```
gem 'shoulda-matchers', git: 'https://github.com/thoughtbot/shoulda-matchers.git', branch: 'rails-5'
```

#### `rails-controller-testing`

Planning on testing your controllers?
Add this: `gem 'rails-controller-testing'`

### Newly Included Technologies

Rails 5 comes with several new technologies – [ActionCable],
[ActiveJob], and [api_mode] to name a few – but this document focuses on
aspects of Rails that we teach that have changed behaviors.  If you'd
like a complete list of differences between Rails 5.1.2 and any earlier
version of Rails, feel free to peruse the [changelogs].

[ActionCable]: http://edgeguides.rubyonrails.org/action_cable_overview.html
[ActiveJob]: http://edgeguides.rubyonrails.org/active_job_basics.html
[api_mode]: http://edgeguides.rubyonrails.org/api_app.html
[changelogs]: http://weblog.rubyonrails.org/releases/
