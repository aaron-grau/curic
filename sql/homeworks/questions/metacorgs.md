# Metaprogramming MetaCorgs

Tonight we'll use metaprogramming to refactor an unwieldy `CorgiPerk` class, 
DRYing it out for our furry friends (because corgis deserve only the best IT 
systems).

## Phase 0: Description

**Scan over `./metacorgs_code.rb` briefly before continuing below.**

In this homework assignment, all of our data is stored in a `ShoppingList`
object, which represents our 'database'. A `ShoppingList` contains information
about 3 different types of corgi perks: bones, kibble, and silly outfits.
`ShoppingList#get_#{perk}_info(id)` and `ShoppingList#get_#{perk}_happiness(id)`
return the info and happiness ratings of each corgi perk, respectively.

An instance of the `CorgiPerk` class represents a "row" of data in that
`ShoppingList`; as such, a `CorgiPerk` initializes with a `perk_id` and a
reference to its `shopping_list`.

Together, these classes represent an ORM that retrieves data from a table - a 
`CorgiPerk` is an object, and the `ShoppingList` instance is the table.

** Try out the ShoppingList methods! **
+ Load the skeleton code in pry.
  + `pry -r './metacorgs_code.rb'`
+ Create a new ShoppingList.
  + `sl = ShoppingList.new`
+ Query it directly a couple times using its getter methods.
  + `sl.get_bone_info(1)`, `sl.get_kibble_info(2)`, `sl.get_silly_outfit_happiness(3)`, &c.

Take another look at the `metacorgs_code.rb` file.  Make a note of repetitive code that can be refactored.

** Try out the CorgiPerk methods! **
+ Create a new CorgiPerk
  + `cp = CorgiPerk.new(1, sl)`
+ Query the ShoppingList using your new CorgiPerk instance
  + `cp.bone`, `cp.kibble`, `cp.silly_outfit`

Our code should behave as follows, with each method returning a string listing
the type of perk along with its info and a happiness rating measured in licks.
Perks with a happiness rating greater than 30 licks get a `*` pre-pended:

```ruby
  cp.bone # => returns "Bone: Phoenician rawhide: 20 licks"
  cp.kibble # => returns "* Kibble: Delicately braised hamhocks: 33 licks"
  cp.silly_outfit # => returns "Silly Outfit: A tiny Ronald McDonald costume: 0 licks"
```

Refactor the three repetitive methods from the `CorgiPerk` class: `#bone`, 
`#kibble`, and `#silly_outfit`. 

## Phase 1: `#method_missing` (aka do it for the metacorgs)

Use `#method_missing` to refactor the `CorgiPerk` class into a new class,
`CorgiPerk2`. The goal is for your `#method_missing` to be functionally
equivalent to `#bone`, `#kibble`, and `#silly_outfit` - that is to say that our
tests from above should still work.

```ruby
  cp2 = CorgiPerk2.new(1, sl) 
  cp2.bone # => returns "Bone: Phoenician rawhide: 20 licks"
  cp2.kibble # => returns "* Kibble: Delicately braised hamhocks: 33 licks"
  cp2.silly_outfit # => returns "Silly Outfit: A tiny Ronald McDonald costume: 0 licks"
```

**Hint:** Within `#method_missing` you can use `#send` to call methods on your `
@shopping_list`. Note that you can pass `#send` a string, allowing for 
interpolation. Review the [metaprogramming][meta_reading] reading if you need a 
reminder on how to do this.

## Phase 2: Dynamic Dispatch (aka really do it for the metacorgs)

Use `#send` in conjunction with `#define_method` within a class method, e.g.
`::define_perk(perk)` to refactor the `CorgiPerk` class into a new class called
`CorgiPerk3`. The class method will dynamically build all of your class'
instance methods. You can call this method upon initialization and use the
methods from the `ShoppingList` class to define your `CorgiPerk` methods, or you
can call it in the class definition itself. Again, feel free to refer to the
[metaprogramming][meta_reading] reading.

## Bonus Phase: Refactor the ShoppingList class using the same principles

Using either `#method_missing` or `#define_method`, refactor the ShoppingList
class so that it follows the DRY principle.

[meta_reading]: ../../readings/metaprogramming.md
