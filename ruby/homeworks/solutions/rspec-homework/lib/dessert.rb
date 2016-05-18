class Dessert
  attr_reader :type, :quantity, :ingredients

  def initialize(type, quantity)
    raise ArgumentError unless quantity.is_a?(Integer)
    @type = type
    @quantity = quantity
    @ingredients = []
  end

  def add_ingredient(ingredient)
    @ingredients << ingredient
  end

  def mix!
    @ingredients.shuffle!
  end

  def eat(amount)
    raise "not enough left!" if @quantity - amount < 0
    @quantity -= amount
  end
end
