json.extract!(
  pokemon,
  :id, :attack, :defense, :image_url, :moves, :name, :poke_type
)

if show_toys
	json.toys do
		pokemon.toys.each do |toy|
			json.set! toy.id do
				json.partial! 'api/toys/toy', toy: toy
			end
		end
	end
end
