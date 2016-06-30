#method_missing

class CorgiPerk

  def initialize(perk_id, shopping_list)
    @id = perk_id
    @shopping_list = shopping_list
  end

  def method_missing(name, *args)
    info = @shopping_list.send("get_#{name}_info", args[0])
    happiness = @shopping_list.send("get_#{name}_happiness", args[0])
    name = "#{name.split('_').map(&:capitalize).join(' ')}"
    result = "#{name}: #{info}: #{happiness}"
    happiness > 30 ? "* #{result}" : result
  end

end


#dynamic dispatch

class CorgiPerk

  def initialize(perk_id, shopping_list)
    @id = perk_id
    @shopping_list = shopping_list
    shopping_list.methods.grep(/^get_(.*)_info$/) { CorgiPerk.define_perk $1 }
  end

  def self.define_perk(name)
    define_method(name) do
      info = @shopping_list.send("get_#{name}_info", @id)
      happiness = @shopping_list.send("get_#{name}_happiness", @id)
      name = "#{name.split('_').map(&:capitalize).join(' ')}"
      result = "#{name}: #{info}: #{happiness}"
      happiness > 30 ? "* #{result}" : result
    end
  end

end
