sl = ShoppingList.new
cp = CorgiPerk.new(1, sl)
cp2 = CorgiPerk2.new(2, sl)
cp3 = CorgiPerk3.new(3, sl)

require 'byebug'

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
    @internal_hash = data
  end

  def get_bone_info(id)
    @internal_hash[id]["bone"]["info"]
  end

  def get_bone_happiness(id)
    @internal_hash[id]["bone"]["happiness"]
  end

  def get_kibble_info(id)
    @internal_hash[id]["kibble"]["info"]
  end

  def get_kibble_happiness(id)
    @internal_hash[id]["kibble"]["happiness"]
  end

  def get_silly_outfit_info(id)
    @internal_hash[id]["silly_outfit"]["info"]
  end

  def get_silly_outfit_happiness(id)
    @internal_hash[id]["silly_outfit"]["happiness"]
  end
end

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

class CorgiPerk2
  # the method_missing CorgiPerk class

  def initialize(perk_id, shopping_list)
    @id = perk_id
    @shopping_list = shopping_list
  end

  def method_missing(name, *args)
    info = @shopping_list.send("get_#{name}_info", @id)
    happiness = @shopping_list.send("get_#{name}_happiness", @id)
    name = "#{name.to_s.split('_').map(&:capitalize).join(' ')}"
    result = "#{name}: #{info}: #{happiness}"
    happiness > 30 ? "* #{result}" : result
  end

end

class CorgiPerk3
  # the dynamic dispatch CorgiPerk class

  def initialize(perk_id, shopping_list)
    @id = perk_id
    @shopping_list = shopping_list
    shopping_list.methods.grep(/^get_(.*)_info$/) { CorgiPerk3.define_perk $1 }
  end

  def self.define_perk(name)
    define_method(name) do
      info = @shopping_list.send("get_#{name}_info", @id)
      happiness = @shopping_list.send("get_#{name}_happiness", @id)
      display_name = "#{name.split('_').map(&:capitalize).join(' ')}"
      result = "#{display_name}: #{info}: #{happiness}"
      happiness > 30 ? "* #{result}" : result
    end
  end

end
