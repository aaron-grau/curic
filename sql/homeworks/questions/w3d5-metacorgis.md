#Metaprogramming in Ruby

I've written an ugly corgi amenities class. The class defines methods that list the info and utility (corgi happiness rating) of various corgi amenities. Amenities with utilities greater than 30 get a star. The class relies on a shopping list that provides access to the info and utility of all corgi amenities with ```get_#{amenity}_info``` and ```get_#{amenity}_utility```.

Your task is to dry up the following CorgiAmenities class using metaprogramming. Corgis deserve only the best amenities and amenity classes. I'd suggest using method_missing or [dynamic dispatch](http://rubyquicktips.com/post/1728928971/spell-dynamic-dispatch).

```ruby
class CorgiAmenities

  def initialize(amenity_id, shopping_list)
    @id = amenity_id
    @shopping_list = shopping_list
  end

  def bone
    info = @shopping_list.get_bone_info(@id)
    utility = @shopping_list.get_bone_utility(@id)
    result = "Bone: #{info}: (#{utility})"
    utility > 30 ? "* #{result}" : result
  end

  def kibble
    info = @shopping_list.get_kibble_info(@id)
    utility = @shopping_list.get_kibble_utility(@id)
    result = "Kibble: #{info}: (#{utility})"
    utility > 30 ? "* #{result}" : result
  end

  def silly_outfit
    info = @shopping_list.get_silly_outfit_info(@id)
    utility = @shopping_list.get_silly_outfit_utility(@id)
    result = "Silly Outfit: #{info}: (#{utility})"
    utility > 30 ? "* #{result}" : result
  end

end
```
