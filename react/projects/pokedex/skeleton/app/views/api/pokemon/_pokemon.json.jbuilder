json.extract!(
  pokemon,
  :id, :attack, :defense, :image_url, :moves, :name, :poke_type
)

if show_items
	json.items do
		pokemon.items.each do |item|
			json.set! item.id do
				json.partial! 'api/items/item', item: item
			end
		end
	end
end
