json.array!(@pokemon) do |pokemon|
  json.partial!('pokemon', pokemon: pokemon, show_items: false)
end
