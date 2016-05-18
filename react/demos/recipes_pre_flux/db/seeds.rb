Recipe.delete_all
Ingredient.delete_all
r1 = Recipe.create!(name: 'pizza')
r1.ingredients.create!([
  {name: 'flour'},
  {name: 'water'},
  {name: 'salt'},
  {name: 'tomatoes'},
  {name: 'cheese'},
  {name: 'basil'},
  {name: 'olive oil'}
])

r1 = Recipe.create!(name: 'power bowl')
r1.ingredients.create!([
  {name: 'yogurt'},
  {name: 'bananas'},
  {name: 'strawberry'},
  {name: 'pecans'},
  {name: 'honey'},
  {name: 'oats'}
])

r1 = Recipe.create!(name: 'cereal')
r1.ingredients.create!([
  {name: 'cereal'},
  {name: 'milk'}
])

r1 = Recipe.create!(name: 'guacamole')
r1.ingredients.create!([
  {name: 'avocados'},
  {name: 'salt'},
  {name: 'lime'},
  {name: 'cilantro'},
  {name: 'onion'}
])
