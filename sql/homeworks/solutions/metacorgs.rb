#method_missing

class CorgiAmenities

  def initialize(amenity_id, shopping_list)
    @id = amenity_id
    @shopping_list = shopping_list
  end

  def method_missing(name, *args)
    info = @shopping_list.send("get_#{name}_info", args[0])
    utility = @shopping_list.send("get_#{name}_utility", args[0])
    name = "#{name.split('_').map(&:capitalize).join(' ')}"
    result = "#{name}: #{info}: (#{utility})"
    utility > 30 ? "* #{result}" : result
  end

end


#dynamic dispatch

class CorgiAmenities

  def initialize(amenity_id, shopping_list)
    @id = amenity_id
    @shopping_list = shopping_list
    shopping_list.methods.grep(/^get_(.*)_info$/) { CorgiAmenities.define_amenity $1 }
  end

  def self.define_amenity(name)
    define_method(name) do
    info = @shopping_list.send "get_#{name}_info" , @id
    utility = @data_source.send "get_#{name}_utility" , @id
    name = "#{name.split('_').map(&:capitalize).join(' ')}"
    result = "#{name}: #{info}: (#{utility})"
    utility > 30 ? "* #{result}" : result
    end
  end

end
