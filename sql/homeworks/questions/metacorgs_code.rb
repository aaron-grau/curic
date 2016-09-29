class ShoppingList
  DATA = {
    1 => {
      "bone" => {
        "info" => "Phoenician rawhide",
        "happiness" => 20
      },
      "kibble" => {
        "info" => "Delicately braised hamhocks",
        "happiness" => 33
      },
      "silly_outfit" => {
        "info" => "A tiny Ronald McDonald costume",
        "happiness" => 0
      }
    },
    2 => {
      "bone" => {
        "info" => "An old dirty bone",
        "happiness" => 31
      },
      "kibble" => {
        "info" => "An old dirty shoe",
        "happiness" => 32
      },
      "silly_outfit" => {
        "info" => "A muddy puddle to roll in",
        "happiness" => 8
      }
    },
    3 => {
      "bone" => {
        "info" => "A rock",
        "happiness" => 4
      },
      "kibble" => {
        "info" => "Avocado skins",
        "happiness" => 17
      },
      "silly_outfit" => {
        "info" => "A Warriors uniform",
        "happiness" => 24
      }
    }
  }
  def initialize(data = DATA)
    @data = data
  end

  def get_bone_info(package_id)
    @data[package_id]["bone"]["info"]
  end

  def get_bone_happiness(package_id)
    @data[package_id]["bone"]["happiness"]
  end

  def get_kibble_info(package_id)
    @data[package_id]["kibble"]["info"]
  end

  def get_kibble_happiness(package_id)
    @data[package_id]["kibble"]["happiness"]
  end

  def get_silly_outfit_info(package_id)
    @data[package_id]["silly_outfit"]["info"]
  end

  def get_silly_outfit_happiness(package_id)
    @data[package_id]["silly_outfit"]["happiness"]
  end
end

class CorgiPerkPackage

  def initialize(package_id, shopping_list)
    @package_id = package_id
    @shopping_list = shopping_list
  end

  def bone
    info = @shopping_list.get_bone_info(@package_id)
    happiness = @shopping_list.get_bone_happiness(@package_id)
    result = "Bone: #{info}: #{happiness} licks"
    happiness > 30 ? "* #{result}" : result
  end

  def kibble
    info = @shopping_list.get_kibble_info(@package_id)
    happiness = @shopping_list.get_kibble_happiness(@package_id)
    result = "Kibble: #{info}: #{happiness} licks"
    happiness > 30 ? "* #{result}" : result
  end

  def silly_outfit
    info = @shopping_list.get_silly_outfit_info(@package_id)
    happiness = @shopping_list.get_silly_outfit_happiness(@package_id)
    result = "Silly Outfit: #{info}: #{happiness} licks"
    happiness > 30 ? "* #{result}" : result
  end

end

class CorgiPerkPackage2
  # the method_missing CorgiPerkPackage class

  def initialize(package_id, shopping_list)
    @package_id = package_id
    @shopping_list = shopping_list
  end

  def method_missing(name, *args)
    # Your code goes here
  end

end

class CorgiPerkPackage3
  # the dynamic dispatch CorgiPerkPackage class

  def initialize(package_id, shopping_list)
    @package_id = package_id
    @shopping_list = shopping_list
  end

  # Less structure to help you with this one :)
end
