# Metaprogramming MetaCorgs

Tonight we'll refactor an unwieldy ```CorgiPerk``` class. Because corgis deserve only the best perks and perk classes.

## Phase 0: Description

Let's refactor the repetitive methods ```#bone```, ```#kibble```, and ```#silly_outfit```. Each returns a string listing the type of perk along with its info and a happiness rating measured in licks. Amenities with a happiness greater than 30 licks get a star.

```ruby
bone #=> "* Bone: Phoenician rawhide: 40 licks"
```

An instance of the ```CorgiPerk``` class initializes with a ```@shopping_list``` that provides access to the info and happiness of all corgi perks with ```get_#{perk}_info(@id)``` and ```get_#{perk}_happiness(@id)```.

```ruby
@shopping_list.get_bone_info(@id) #=> "Phoenician rawhide"
@shopping_list.get_bone_happiness(@id) #=> "40 licks"
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

## Phase 1: ```#method_missing``` aka Do it for the Metacorgs

Use```#method_missing``` to refactor. The goal is for your ```#method_missing``` to be functionally equivalent to ```#bone```, ```#kibble```, and ```#silly_outfit```.

**Hint**: Within ```#method_missing``` you can use ```#send``` to call methods on your ```@shopping_list```. Note that you can pass ```#send``` a string, allowing for interpolation.

## Phase 2: Dynamic Dispatch aka Really Do it for the Metacorgs

Next try using ```#send``` in conjunction with ```#define_method``` within a class method, e.g. ```::define_perk(perk)```, that dynamically builds all of your class' instance methods. You can call this method upon initialization. This technique is called dynamic dispatch.
