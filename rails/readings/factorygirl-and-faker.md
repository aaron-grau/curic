# Better Fixtures with FactoryGirl and Faker

## Motivation

We need to create instances of our models in order to test them. We
could do something like this:

```ruby
# BAD
cat = Cat.create(
  name: 'Fluffy',
  color: 'Dark Brown',
  email: 'meow@meow.com',
  owner_id: 1,
  active: true,
  temperament: 'mild'
)
# ... test stuff about the cat object

```

However, we want to avoid having all of that clutter in our test code
each time we need to work with a cat for testing purposes. One solution
to this problem is Rails's built-in fixtures, but they have [some
downsides][factories-bad] of their own.

## FactoryGirl

The best solution is to use factories. **FactoryGirl** is [the top
library][factories-good] for replacing fixtures. It allows us to write:

[factories-bad]: https://semaphoreapp.com/blog/2014/01/14/rails-testing-antipatterns-fixtures-and-factories.html
[factories-good]: https://www.ruby-toolbox.com/categories/rails_fixture_replacement

```ruby
# GOOD
cat = FactoryGirl.build(:cat)
```

The cat object will be created using default values for its attributes,
which are defined by a factory like so:

```ruby
# my_app/spec/factories/cats.rb

FactoryGirl.define do
  factory :cat do # The name matters. :cat factory returns a Cat object.
    name 'Fluffy'
    color 'Dark Brown'
    email 'meow@meow.com'
    owner_id 1
    active true
    temperament 'mild'
  end
end
```

These default values can be selectively overridden:

```ruby
evil_cat = FactoryGirl.build(:cat, temperament: 'malicious')
# evil_cat.temperament => "malicious"
# evil_cat.name => "Fluffy"
```

This allows us to write to-the-point tests:

```ruby
# my_app/spec/models/cat_spec.rb

RSpec.describe Cat do
  it 'is valid when required attributes are present' do
    expect(FactoryGirl.build(:cat)).to be_valid
  end

  context 'is invalid' do
    specify 'when name is blank' do
      expect(FactoryGirl.build(:cat, name: '')).not_to be_valid
    end
    # ...
  end
end
```

## Faker

All of our cats will be named Fluffy, have the same email, color, etc.
unless we individually override these attributes. This homogeneity might
be undesirable. **Faker** gem to the rescue! It generates filler data
like names, phone numbers, and Lorem Ipsum. We'll use it to make our
factories dynamic rather than static.

We'll see more examples soon, but, first, let's get set up.

## Setting Up FactoryGirl and Faker

*In just three steps:*

1. [Set up RSpec][rspec-setup] for your Rails application
2. In the `Gemfile`, add `gem 'factory_girl_rails'` under `group
   :development, :test`, and add `gem 'faker'` under the `group :test`.

  Your new `Gemfile` should include the following gems:

  ```ruby
  # my_app/Gemfile
  group :development, :test do
    gem 'rspec-rails'
    gem 'factory_girl_rails'
  end

  group :test do
    gem 'faker'
    gem 'capybara'
    gem 'guard-rspec'
    gem 'launchy'
  end
  ```

  Run `bundle install` to install the `faker` and `factory_girl` gems.

3. Add the following line at the end of your `config.generators` block
    inside of the `config/application.rb` file:


```ruby
  g.fixture_replacement :factory_girl, :dir => "spec/factories"
```

You should now have the following in your `config/application.rb` file:


```ruby
config.generators do |g|
  g.test_framework :rspec,
    :fixtures => true,
    :view_specs => false,
    :helper_specs => false,
    :routing_specs => false,
    :controller_specs => true,
    :request_specs => false
  g.fixture_replacement :factory_girl, :dir => "spec/factories"
end
```

Lastly, if you don't want to need to prefix each FactoryGirl method call
with `FactoryGirl`, add `config.include FactoryGirl::Syntax::Methods` in
your `rails_helper.rb` file:

```ruby
RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
```

Then you can do things like call `build(:user)` instead of
`FactoryGirl.build(:user)` in your specs.

[rspec-setup]: rspec-and-rails-setup.md

## Using FactoryGirl and Faker

### Setting up Factories

To use FactoryGirl with RSpec, you will create a file called
`factories.rb` in the directory `my_app/spec`.  The factories you define
in that file can be used in your RSpec test files. You can also
define each factory in a separate file if you create the directory
`my_app/spec/factories` and put them inside.

Suppose we have a `Post` model, and its attributes are `title`,
`subtitle`, `random_num`, and `published`. Typical factory setup:

```ruby
# my_app/spec/factories/posts.rb

FactoryGirl.define do
  factory :post do
    title "It's a title!"
    subtitle "~also has a subtitle~"
    random_num { 1 + rand(100) }

    # Child of :post factory, since it's in the `factory :post` block
    factory :published_post do
      published true
    end
  end
end
```

### Using Faker

The `faker` gem is a module of methods that generate randomized fake
data in specific formats.  It can generate names, addresses, phone
numbers, business and product names, and more.  Some quick examples:

```ruby
[1] pry(main)> require 'faker'
=> true

[2] pry(main)> Faker::Commerce.product_name
=> "Ergonomic Steel Shoes"

[3] pry(main)> Faker::Internet.domain_name
=> "haley.org"

[4] pry(main)> Faker::Name.name
=> "Neal Deckow"
```

The [`faker` documentation][faker-docs]
has details about all the data types available.

[faker-docs]: http://rubydoc.info/github/stympy/faker/master/frames

### Testing Model Validations

Start with the most basic factory to satisfy your model validations.  In
other words, if you have no required attributes for `cat`, then your
factory could look like this:

```ruby
# in my_app/spec/factories/cats.rb

FactoryGirl.define do
  factory :cat do
  end
end
```

And your test could look like this:

```ruby
# in my_app/spec/cat_spec.rb

require 'spec_helper'

describe Cat do
  it "has no required attributes" do
    expect(FactoryGirl.build(:cat)).to be_valid
  end
end
```

However, let's say your model has many specific validations and required
attributes:

```ruby
# in my_app/app/models/cat.rb

class Cat < ActiveRecord::Base
  validates :name, :presence => true, format: { with:  /\A[a-zA-Z\s\.]+\z/,
    message: "only allows letters and spaces" }, length: { minimum: 3 },
    uniqueness: true
  validates :color, :presence => true, inclusion: { in: %w(red blue green yellow brown black white orange),
    message: "That is not a valid color for a cat." }
  validates :age, :presence => true, numericality: { only_integer: true,
    less_than: 100, message: "Cat age must be a number below 100." }
  validates :temperament, :presence => true, exclusion: { in: %w(evil mean),
    message: "No bad cats allowed!" }
end
```

In that case, you need to explicitly create attributes in the factory
which satisfy the validations, like this:

```ruby
# in my_app/spec/factories/cats.rb

FactoryGirl.define do
  factory :cat do
    name "Garfield"
    color "orange"
    age 53
    temperament "sarcastic"
  end
end
```

**Overwriting attributes in your test**

A valid model factory can easily be overwritten to test invalid
instances of the model:

```ruby
# ...
it "must have a name" do
  expect(FactoryGirl.build(:cat, name: nil)).not_to be_valid
end
# ...
```

Passing in a hash of attributes and values for the second argument of
`FactoryGirl#build`, `FactoryGirl#create`, and similar methods will
overwrite those attributes for the model.

```ruby
# in my_app/spec/models/cat_spec.rb

# fully testing the name validations

describe Cat do
  context "when name is invalid" do
    it "should require a name" do
      expect(FactoryGirl.build(:cat, :name => "")).not_to be_valid
    end

    it "should only accept letters and spaces in name" do
      expect(FactoryGirl.build(:cat, :name => "1337-H4x0r")).not_to be_valid
    end

    it "should require a name longer than 2 letters" do
      expect(FactoryGirl.build(:cat, :name => "Bo")).not_to be_valid
    end
  end
 # (... more validation tests would follow.)
end
```

### Making Many Models At Once

**Creating Randomized Data**

If you want to generate a large batch of test data, you most likely want
different attributes for each entry (rather than having 100 users with
the name 'John Doe').

To generate random names for our test users, we must
[pass a block][passing-block] that generates the random name string
instead of passing the string value itself.

```ruby
# in my_app/spec/factories/puppies.rb

FactoryGirl.define do
  factory :puppy do
    name { Faker::Name.name }
  end
end
```

In the RSpec test, you can now
[generate or build multiple records][mult-records].

[passing-block]: https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#lazy-attributes
[seqs]: https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#sequences
[mult-records]: https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#building-or-creating-multiple-records

### Models with Associations

Using a sequence is an easy way to generate associated models with
unique values, because it gives you an iterator.

Example: Creating a cat with an associated hat.

(This assumes you have already got the `hat.rb` model file, the
`create_hats...` table migration, and the one-to-one association
between cats and  hats set up.)

```ruby
# in my_app/spec/factories/cats.rb

FactoryGirl.define do
  factory :cat do
    sequence :hat do |n|
      FactoryGirl.build(:hat, :hat_name => "top-hat #{n}")
    end
  end
end
```

This example also uses FactoryGirl
[sequences][seqs], to add an iterator.

You can test the association in this case by calling `#hat` on the
generated cat:

```ruby
# in my_app/specs/cat_spec.rb

describe Cat do

 # ...

  it "may wear a hat" do
    expect(FactoryGirl.build(:cat).hat).to be_instance_of(Hat)
  end

end
```

### `FactoryGirl.build` vs. `FactoryGirl.create`

`FactoryGirl.build(:factory_name)` returns an object that is not written
to the database. `FactoryGirl.create(:factory_name)` will write the
created record to the database; it is therefore slower than `build`.
Prefer `build` unless you have a need to write to the database.
