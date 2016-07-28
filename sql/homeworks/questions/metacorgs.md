# Metaprogramming MetaCorgs

Tonight we'll refactor an unwieldy `CorgiPerk` class, DRYing it out for our furry friends (because corgis deserve only the best IT systems).

## Phase 0: Description

An instance of the `CorgiPerk` class initializes with a `perk_id` and a `shopping_list`. A `ShoppingList` contains information about 3 different types of corgi perks: bones, kibble, and silly outfits. This is intended to be analogous to an ORM that retrieves data from a table - a `CorgiPerk` is an object, and the ShoppingList instance is the table.

`ShoppingList#get_#{perk}_info(id)` and `ShoppingList#get_#{perk}_happiness(id)` return the info and happiness ratings of each corgi perk, respectively.

** Try this out! **
+ Load the skeleton code in pry
  + `pry -r './metacorgs_code.rb'`
+ Create a new ShoppingList
  + `sl = ShoppingList.new`
+ Query it directly a couple times!
  + `sl.get_bone_info(1)`, `sl.get_kibble_info(2)`, `sl.get_silly_outfit_happiness(3)`, &c.
+ Create a new CorgiPerk
  + `cp = CorgiPerk.new(1)`
+ Query the ShoppingList using your new CorgiPerk instance
  + `cp.bone`, `cp.kibble`, `cp.silly_outfit`

Our job is to refactor three repetitive methods from the `CorgiPerk` class: `#bone`, `#kibble`, and `#silly_outfit`. Each returns a string listing the type of perk along with its info and a happiness rating measured in licks. Amenities with a happiness rating greater than 30 licks get a `*`.

Our code should behave as follows:

```ruby
  cp.bone # => returns "Bone: Phoenician rawhide: 20 licks"
```

Take a minute to familiarize yourself with the class as it stands now. Look for repetitive code to refactor.

## Phase 1: `#method_missing` (aka do it for the metacorgs)

Use `#method_missing` to refactor the `CorgiPerk` class into a new class, `CorgiPerk2`. The goal is for your `#method_missing` to be functionally equivalent to `#bone`, `#kibble`, and `#silly_outfit`.

**Hint:** Within `#method_missing` you can use `#send` to call methods on your `@shopping_list`. Note that you can pass `#send` a string, allowing for interpolation. Review the [metaprogramming][meta_reading] reading if you need a reminder on how to do this.
[meta_reading]: ../../readings/metaprogramming.md

## Phase 2: Dynamic Dispatch (aka really do it for the metacorgs)

Use `#send` in conjunction with `#define_method` within a class method, e.g. `::define_perk(perk)` to refactor the `CorgiPerk` class into a new class called `CorgiPerk3`. The class method will dynamically build all of your class' instance methods. You can call this method upon initialization. This technique is called dynamic dispatch.

## Bonus Phase: Refactor the ShoppingList class using the same principles

Using either `#method_missing` or `#define_method`, refactor the ShoppingList class so that it follows the DRY principle.