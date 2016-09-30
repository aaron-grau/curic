# Meta-Programming MetaCorgis

Today we'll use meta-programming to refactor an unwieldy `CorgiPerkPackage` class.

## Phase 0: Tour the Code!

**Download and scan over the [skeleton][skeleton] briefly before continuing below.**

[skeleton]:./skeleton.zip?raw=true

### `ShoppingList` Class

The `ShoppingList` class represents our database. 

The database has three perk packages, stored in the `DATA` constant. Each 
packages has three corgi perks - a bone, kibble, and a silly outfit.

It also has methods defined to tell us the info and happiness level of a
given perk in whichever package we specify - e.g. `get_{perk}_info` and
`get_{perk}_happiness`. So if we wanted to know the happiness level of the
bone in package two, we would simply call `get_bone_happiness(2)` on an
instance of `ShoppingList`.

### `CorgiPerkPackage` Class

The `CorgiPerkPackage` class serves as an interface with our database. 

`CorgiPerkPackage` must contain a reference to the database
(an instance of `ShoppingList`) and its `package_id` within the database.
We should be able to call `bone`, `kibble`, or `silly_outfit` on any instance of
`CorgiPerkPackage` get back a statement of the info and happiness level of that
perk. 

### Test Drive

Do a quick test of the code to get more familiar with how it all fits together.

Check out the `ShoppingList`'s instance methods to get perk info and happiness levels:

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> list = ShoppingList.new
pry(main)> list.get_bone_info(1) # => "Phoenician rawhide"
pry(main)> list.get_kibble_happiness(3) # => 17
```

Then test out the `CorgiPerkPackage` class:

```ruby
pry(main)> package = CorgiPerkPackage.new(list, 1)
pry(main)> package.bone # => "Bone: Phoenician rawhide: 20 licks"
pry(main)> package.kibble # => "* Kibble: Delicately braised hamhocks: 33 licks"
```

## Phase 1: Refactor with `#method_missing`

When we call any perk instance method on a package, we get back a very similar
result:

  + a star if the happiness level has gone above 30,
  + the perk type,
  + the perk description,
  + and the number of licks (the happiness level).
  
It is repetitive and not modular to have all three methods defined on the
`CorgiPerkPackage` class when they follow the same pattern.

+ Using a `method_missing` instance method, re-factor `CorgiPerkPackage` into
the new `MetaCorgiPerkPackage` class to DRY things up!
+ Hint: Within `#method_missing` use `#send` to call methods on your `@shopping_list`.
+ Note: You can pass `#send` a string, allowing for interpolation. Review the
[metaprogramming][meta_reading] reading if you need a reminder on how to do this.

If you've got it working correctly, its behavior should be the same as before,
just a lot DRY-er!

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> list = ShoppingList.new
pry(main)> meta_package = MetaCorgiPerkPackage.new(list, 1)
pry(main)> meta_package.bone # => "Bone: Phoenician rawhide: 20 licks"
pry(main)> meta_package.kibble # => "* Kibble: Delicately braised hamhocks: 33 licks"
```

## Phase 2: Refactor with Dynamic Dispatch

Let's refactor the class to use dynamic dispatch instead of `method_missing`.

+ **Comment out** the `MetaCorgiPerkPackage#method_missing` instance method from the previous phase.
+ Write a new **class** method called `::define_perk` that uses
`::define_method` to dynamically build each of the perk methods (`bone`,
`kibble`, and `silly_outfit`) on the `CorgiPerkPackage` class. + Once again,
you'll want to use `#send` to call the right methods on the `@shopping_list`.

Your class should function like this now:
```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> MetaCorgiPerkPackage.define_perk("bone")
pry(main)> list = ShoppingList.new
pry(main)> meta_package = MetaCorgiPerkPackage.new(list, 1)
pry(main)> meta_package.bone # => "Bone: Phoenician rawhide: 20 licks"
pry(main)> meta_package.kibble # => "NoMethodError: undefined method `kibble'...""
```

Almost there! Now we just need to automatically call
`CorgiPerkPackage::define_perk` for each perk upon initialization.

+ How do we know what the different perks are?
+ One way to tell is to call `#methods` on our `@shopping_list`.
+ This will give us back an array of all the methods defined on that object.
+ Then we can match the ones we care about using [grep][grep].
+ If we pass `grep` the argument `/^get_(.*)_info$/`, it will match any methods
that are some variation of `get_{perk}_info` and "capture" the perk name - the `(.*)`
tells it to capture any number of characters that come between `get_` and
`_info`.
+ We can then use `$1` to get back the matching perk name that was captured.
+ So we can pass the block `{ MetaCorgiPerkPackage.define_perk $1 }` to our
`grep` call, and it will call `::define_perk` with each perk name.

You should call something like this in the `initialize` method:
```ruby
shopping_list.methods.grep(/^get_(.*)_info$/) { MetaCorgiPerkPackage.define_perk $1 }
```

This should work as before again!

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> list = ShoppingList.new
pry(main)> meta_package = MetaCorgiPerkPackage.new(list, 1)
pry(main)> meta_package.bone # => "Bone: Phoenician rawhide: 20 licks"
pry(main)> meta_package.kibble # => "* Kibble: Delicately braised hamhocks: 33 licks"
pry(main)> meta_package.silly_outfit # => "Silly Outfit: A tiny Ronald McDonald costume: 0 licks"
```

[grep]: http://ruby-doc.org/core-2.3.1/Enumerable.html#method-i-grep
[meta_reading]: ../../../../readings/metaprogramming.md
