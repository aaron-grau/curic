# Polymorphism and Concerns

Today we'll make an app that gives toys to cute animals. We'll start with corgis and cats. Your [skeleton.zip](skeleton.zip) already has `Corgi` and `Cat` models. Here's the schema:

#### corgis
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

#### cats
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null


## Phase 0: Create a Toys Table

First create a migration that implements the following schema:

#### toys
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, unique, indexed
toyable_id  | integer   | indexed
toyable_type| string    |

This line within the `create_table` block generates the last two columns as well as the index:
```ruby
t.references :toyable, polymorphic: true, index: true
```

Run `rake db:migrate`.

## Phase 1: Create Polymorphic Associations

The purpose of a polymorphic association is to allow one model to belong to multiple models on a single association. Using as little code as possible, we want to give to corgis, cats, and whatever other cute animals we choose a `toys` association.

First create a `Toy` model and build a polymorphic `belongs_to` association on `toyable`. Refer to the [polymorphic association reading](http://guides.rubyonrails.org/association_basics.html#polymorphic-associations) for syntax.


Next build corresponding `has_many` associations in the `Corgi` and `Cat` models. These should both be named `toys`. Again, refer to the [reading]((http://guides.rubyonrails.org/association_basics.html#polymorphic-associations)).

Run `rake db:seed`. Check that your associations work as expected.

## Phase 2: Create a Toyable Concern

What if we want to give more toys to more cute animals? We'd want each new class to have a `#receive_toy(name)` method and a `toys` association. Sounds like a perfect opportunity to use a concern!

A [concern](https://github.com/appacademy/curriculum/blob/master/rails/readings/concerns.md) is just a [module](https://github.com/appacademy/curriculum/blob/master/ruby/readings/modules.md) that extends `ActiveSupport::Concern`. Like other modules, a concern permits shared functionality across classes.

Create a file called `toyable.rb` in the `app/models/concerns` directory. Paste the following into your file:

```ruby
module Toyable
  extend ActiveSupport::Concern

  included do

  end

  def receive_toy(name)

  end
end

```

Write the code for the `toys` association within an `included` block. All code within this block is executed whenever the module is included within the context of the class that includes it.

Next write a `#receive_toy(name)` method. Any animal instance whose class includes the `Toyable` concern can call this method. This method should first find or create a toy whose name matches the argument. Next it should add this toy to `self`'s `toys`. For both steps, you may wish to use the ActiveRecord `#find_or_create_by` [method](http://apidock.com/rails/v4.2.1/ActiveRecord/Relation/find_or_create_by).

After you've created your `Toyable` concern, go back to your `Corgi` and `Cat` models and `include` your new `Toyable` concern. You can delete the associations you wrote previously.

Test your code and call it a night!
