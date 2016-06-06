# Metaprogramming MetaCorgs

## Description

Tonight we'll refactor an unwieldy ```CorgiPerk``` class. Because corgis deserve only the best perks and perk classes.

The class has an ```initialize``` method, but we'll focus on refactoring its three custom methods: ```#bone```, ```#kibble```, and ```#silly_outfit```. The methods have repetitive functionality. Each returns a string listing the type of perk along with its info and a happiness rating measured in licks.

An instance of the ```CorgiPerk``` class initializes with a ```@shopping_list``` that provides access to the info and happiness of all corgi perks with ```get_#{perk}_info(@id)``` and ```get_#{perk}_happiness(@id)```. Amenities with a happiness greater than 30 licks get a star.

Here's an example:

```ruby
@shopping_list.get_bone_info(@id) #=> "Phoenician rawhide"
@shopping_list.get_bone_happiness(@id) #=> "40 licks"
bone #=> "* Bone: Phoenician rawhide: 40 licks"
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

## Do it for the Metacorgs

We recommend employing ```#method_missing``` to refactor. Within ```#method_missing``` you can use ```#send``` to call methods on your ```@shopping_list```. Note that you can pass ```#send``` a string, allowing for interpolation. The goal is for your ```#method_missing``` to be functionally equivalent to ```#bone```, ```#kibble```, and ```#silly_outfit```.

Next try using ```#send``` in conjunction with ```#define_method``` within a class method, e.g. ```::define_perk(perk)```, that dynamically builds all of your class' instance methods. You can call this method upon initialization. This technique is called dynamic dispatch.
