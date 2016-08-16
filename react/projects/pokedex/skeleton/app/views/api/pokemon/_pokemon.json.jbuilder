json.extract!(
  pokemon,
  :id, :attack, :defense, :image_url, :moves, :name, :poke_type
)

if show_toys
	json.toys do 
		json.partial! partial: 'api/toys/toy', collection: pokemon.toys, as: :toy
	end
end
