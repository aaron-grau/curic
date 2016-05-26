# Metaprogramming MetaCorgs

Tonight we'll refactor an unwieldy `CorgiPerk` class. Because corgis deserve only the best perks and perk classes.

## Phase 0: Description

An instance of the `CorgiPerk` class initializes with a `perk_id` and a `shopping_list`.  The shopping list contains information about 3 different types of corgi perks: bones, kibble, and silly outfits.  You may assume that `shopping_list.get_#{perk}_info(id)` and `shopping_list.get_#{perk}_happiness(id)` return the info and happiness ratings of each corgi perk, respectively.

Our job is to refactor three repetitive methods from the `CorgiPerk` class: `#bone`, `#kibble`, and `#silly_outfit`. Each returns a string listing the type of perk along with its info and a happiness rating measured in licks. Amenities with a happiness rating greater than 30 licks get a `*`.  

For example, our code should behave as follows:

```ruby
  # Given the following behavior:
  demo_shopping_list.get_bone_info(10) # => returns "Phoenician rawhide"
  demo_shopping_list.get_bone_happiness(10) # => returns "40 licks"

  # Create new instance of CorgiPerk class
  demo_corgi = CorgiPerk.new(10, my_list)

  # Functionality provided by our code
  demo_corgi.bone # => returns "* Bone: Phoenician rawhide: 40 licks"
```

Take a minute to familiarize yourself with the class as it stands now. Look for repetitive code to refactor.

```ruby
class CorgiPerk

  def initialize(perk_id, shopping_list)
    @id = perk_id
    @shopping_list = shopping_list
  end

  def bone
    info = @shopping_list.get_bone_info(@id)
    happiness = @shopping_list.get_bone_happiness(@id)
    result = "Bone: #{info}: #{happiness}"
    happiness > 30 ? "* #{result}" : result
  end

  def kibble
    info = @shopping_list.get_kibble_info(@id)
    happiness = @shopping_list.get_kibble_happiness(@id)
    result = "Kibble: #{info}: #{happiness}"
    happiness > 30 ? "* #{result}" : result
  end

  def silly_outfit
    info = @shopping_list.get_silly_outfit_info(@id)
    happiness = @shopping_list.get_silly_outfit_happiness(@id)
    result = "Silly Outfit: #{info}: #{happiness}"
    happiness > 30 ? "* #{result}" : result
  end

end
```

## Phase 1: `#method_missing` (aka do it for the metacorgs)

Employ `#method_missing` to refactor. The goal is for your `#method_missing` to be functionally equivalent to `#bone`, `#kibble`, and `#silly_outfit`.

**Hint:** Within `#method_missing` you can use `#send` to call methods on your `@shopping_list`. Note that you can pass `#send` a string, allowing for interpolation.

## Phase 2: Dynamic Dispatch (aka really do it for the metacorgs)

Next try using `#send` in conjunction with `#define_method` within a class method, e.g. `::define_perk(perk)`, that dynamically builds all of your class' instance methods. You can call this method upon initialization. This technique is called dynamic dispatch.
