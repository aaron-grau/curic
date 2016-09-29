# Metaprogramming MetaCorgs

Today we'll use metaprogramming to refactor an unwieldy `CorgiPerk` class.

## Phase 0: Tour the Code!

**Scan over `./metacorgs_code.rb` briefly before continuing below.**

### `ShoppingList` Class

The `ShoppingList` class represents our database. The database has three perk
packages, stored in the `DATA` constant. Each packages has three corgi perks -
a bone, kibble, and a silly outfit.

It also has methods defined to tell us the info and happiness level of a
given perk in whichever package we specify - i.e. `get_{perk}_info` and
`get_{happiness}_info`. So if we wanted to know the happiness level of the
bone in package two, we could simply call `get_bone_happiness(2)` on an
instance of `ShoppingList`.

### `CorgiPerkPackage` Class

The `CorgiPerkPackage` class serves as a clean interface with our database. We
should be able to call `bone`, `kibble`, or `silly_outfit` on any instance of
`CorgiPerkPackage` get back a statement of the info and happiness level of that
perk. This means a `CorgiPerkPackage` must contain reference to the database (an
instance of `ShoppingList`) and its `package_id` within the datbase.

### Test Drive

Do a quick test of the code to get more familiar with how it all fits together.

Check out the `ShoppingList`'s instance methods to get perk info and happiness levels:

```ruby
[1] pry(main)> load 'metacorgs_code.rb'
[2] pry(main)> list = ShoppingList.new
[3] pry(main)> list.get_bone_info(1) # => "Phoenician rawhide"
[4] pry(main)> list.get_kibble_happiness(3) # => 17
```

Then test out the existing `CorgiPerkPackage` class:

```ruby
[5] pry(main)> package_one = CorgiPerkPackage.new(1, list)
[6] pry(main)> package_one.bone # => "Bone: Phoenician rawhide: 20 licks"
[7] pry(main)> package_one.kibble # => "* Kibble: Delicately braised hamhocks: 33 licks"
[8] pry(main)> package_one.silly_outfit # => "Silly Outfit: A tiny Ronald McDonald costume: 0 licks"
```

## Phase 1: Refactor with `#method_missing`

When we call any perk instance method on a package, we get back a very similar
result: a star if the happiness level has gone above 30, the perk type, the perk
description, and the number of licks (the happiness level). It seems a little repetitive
to have all three methods defined on the `CorgiPerkPackage` class when they follow
the same pattern. Using a `method_missing` instance method, re-factor `CorgiPerkPackage`
into the new `CorgiPerkPackage2` class to DRY things up!

**Hint:** Within `#method_missing` you can use `#send` to call methods on your `@shopping_list`.
Note that you can pass `#send` a string, allowing for interpolation. Review the
[metaprogramming][meta_reading] reading if you need a reminder on how to do this.

If you've got it working correctly, its behavior should be the same as before, just a lot
DRY-er!

## Phase 2: Refactor with Dynamic Dispatch

Now write a new **class** method called `::define_perk` that uses `::define_method` to
dynamically build each of the perk methods (`bone`, `kibble`, and `silly_outfit`) on the
`CorgiPerkPackage3` class. Once again, you'll want to use `#send` to call the right
methods on the `@shopping_list`.

Almost there! Now we just need to actually call `CorgiPerkPackage3::define_perk` for each
perk. How do we know what the different perks are? One way to tell is to call `#methods` on
our `@shopping_list`. This will give us back an array of all the methods defined on that object.
Then we can match the ones we care about using [grep][grep]. If we pass `grep` the argument `/^get_(.*)_info$/`,
it will match any methods that are some variation of `get_{perk}_info` and "capture" the perk name -
the `(.*)` tells it to capture any number of characters that come between `get_` and `_info`.
We can then use `$1` to get back the matching perk name that was captured. So we can pass the block
`{ CorgiPerkPackage3.define_perk $1 }` to our `grep` call, and it will call `::define_perk` with each perk name.
It should look something like this:
```ruby
  shopping_list.methods.grep(/^get_(.*)_info$/) { CorgiPerkPackage3.define_perk $1 }
```

:tada: metacorgis!

## Bonus Phase: Refactor the ShoppingList class using the same principles

Using either `#method_missing` or `#define_method`, refactor the ShoppingList
class so that it is DRY too.

[grep]: http://ruby-doc.org/core-2.3.1/Enumerable.html#method-i-grep
[meta_reading]: ../../readings/metaprogramming.md
